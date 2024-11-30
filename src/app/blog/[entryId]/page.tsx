import { ResolvingMetadata } from 'next';
import React from 'react';
import styles from '../page.module.scss';
import { promises as fs } from 'fs';
import fm, { FrontMatterResult } from 'front-matter';
import { BlogEntryAttributes } from '../BlogEntry';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ContentTable from '../ContentTable';
import { fontAside, fontTitle } from '@/app/fonts/fonts';
import rehypeSlug from 'rehype-slug';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import BlogCode from '../BlogCode';
import BlogPre from '../BlogPre';
import InlineCode from '../InlineCode';
import CodeBlock from '../CodeBlock';
import WIcon from '@/components/WIcon';
import Clock from '@/components/Clock';

export async function generateMetadata (parent: ResolvingMetadata) {
    const entry = await fetchFile("test");

    return {
        title: `${entry.attributes.title} – Azaria`,
    }
}

export interface PidPageProps {
    params: Promise<{
        entryId: string
    }>
}

async function PidPage ({
    params,
}: PidPageProps) {
    const { entryId } = await params;

    const entry = await fetchFile(entryId);
    const headings = entry.body.match(/^#+.*/gm);

    const components = {
        h1: BlogH1,
        code: BlogCode,
        pre: BlogPre,
        InlineCode,
        CodeBlock,
        WIcon,
        Clock,
    };

    return (
        <div className={styles.entry}>
            <h1 className={`${styles.entryTitle} ${fontTitle.className}`}>
                {entry.attributes.title}
            </h1>
            <aside className={`${styles.contentTable} ${fontAside.className}`}>
                {headings && <ContentTable
                    headings={headings}
                />}
            </aside>
            <main className={styles.content}>
                {<MDXRemote
                    source={entry.body}
                    components={components}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [
                                rehypeSlug,
                                rehypeMdxCodeProps,
                            ]
                        }
                    }}
                />}
            </main>
        </div>
    );
}

function BlogH1 ({id, ...headingProps}: React.HTMLAttributes<HTMLHeadingElement>) {
    if (id) return (
        <Link href={`#${id}`}>
            <h1 id={id} {...headingProps} />
        </Link>
    );
    else return (
        <h1 {...headingProps} />
    );
}

async function fetchFile (entryId: string) : Promise<FrontMatterResult<BlogEntryAttributes>> {
    const file = await fs.readFile(
        process.cwd() + `/public/static/blog/examples/${entryId}.md`, 'utf8'
    );
    const content = fm<BlogEntryAttributes>(file);
    return content;
}

export default PidPage;
