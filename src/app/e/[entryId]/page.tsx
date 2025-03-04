import { Metadata } from 'next';
import React from 'react';
import styles from './page.module.scss';
import { promises as fs } from 'fs';
import fm, { FrontMatterResult } from 'front-matter';
import { BlogEntryAttributes } from '../../BlogEntry';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ContentTable from '../../ContentTable';
import { fontAside, fontTitle } from '@/app/fonts/fonts';
import rehypeSlug from 'rehype-slug';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import BlogCode from '../../BlogCode';
import BlogPre from '../../BlogPre';
import InlineCode from '../../InlineCode';
import CodeBlock from '../../CodeBlock';
import WIcon from '@/components/WIcon';
import Clock from '@/components/Clock';
import rehypeSanitize from 'rehype-sanitize';
import Aside from './.components/Aside';
import Type from './.components/Type';

type Props = {
    params: {
      entryId: string;
    };
  };

export async function generateMetadata ({ params }: Props) {
    const entry = await fetchFile("test");

    return {
        title: `${entry.attributes.title} – Azaria`,
    }
}

export interface EntryPageProps {
    params: Promise<{
        entryId: string
    }>
}

async function EntryPage ({
    params,
}: EntryPageProps) {
    const { entryId } = await params;

    const entry = await fetchFile(entryId);
    const headings = entry.body.match(/^#+.*/gm)?.map(h => h.substring(2)) ?? [];

    const components = {
        h1: BlogH1,
        code: BlogCode,
        pre: BlogPre,
        aside: Aside,
        Aside,
        InlineCode,
        CodeBlock,
        WIcon,
        Clock,
        Type,
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
                <div className={styles.entryBody}>
                    {<MDXRemote
                        source={entry.body}
                        components={components}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [
                                    rehypeSlug,
                                    //rehypeSanitize, // TODO: Reimplement
                                    rehypeMdxCodeProps,
                                ]
                            }
                        }}
                    />}
                </div>
            </main>
        </div>
    );
}

function BlogH1 ({id, ...headingProps}: React.HTMLAttributes<HTMLHeadingElement>) {
    if (id) return (
        <Link className={styles.h1Container} href={`#${id}`}>
            <h1 id={id} {...headingProps} />
        </Link>
    );
    else return (
        <h1 {...headingProps} />
    );
}

async function fetchFile (entryId: string) : Promise<FrontMatterResult<BlogEntryAttributes>> {
    const file = await fs.readFile(
        process.cwd() + `/public/static/blog/${entryId}.md`, 'utf8'
    );
    const content = fm<BlogEntryAttributes>(file);
    return content;
}

export default EntryPage;
