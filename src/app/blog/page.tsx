import Clock from '@/components/Clock';
import WIcon from '@/components/WIcon';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import React from 'react';
import styles from './page.module.scss';
import { poppins } from "@/app/fonts/fonts";
import { BlogEntryAttributes } from './BlogEntry';
import { splitIntoLines } from '@/utils';
import Head from 'next/head';
import { Metadata, ResolvingMetadata } from 'next';
import { promises as fs } from 'fs';
import fm, { FrontMatterResult } from 'front-matter';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';
import { codeToHtml } from 'shiki';
import InlineCode from './InlineCode';
import CodeBlock from './CodeBlock';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import BlogPre from './BlogPre';
import BlogCode from './BlogCode';

export async function generateMetadata (parent: ResolvingMetadata) {
    const entry = await fetchFile();

    return {
        title: `${entry.attributes.title} – Azaria`,
    }
}

async function BlogPage () {
    const entry = await fetchFile();
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
        <div className={`${styles.blogPage} ${poppins.className}`}>
            <header className={styles.header}>
                <h1>{entry.attributes.title}</h1>
            </header>
            <div className={styles.entry}>
                <aside className={styles.contentTable}>
                    <div className={styles.headings}>
                        <div className={styles.headings}>
                            {headings?.map(h => <Link
                                key={h}
                                href={`#${h.substring(2).toLocaleLowerCase().replaceAll(" ", "-")}`}
                            >
                                <div>{h.substring(2)}</div>
                            </Link>)}
                        </div>
                    </div>
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
            <footer className={styles.footer}>
                This is the footer
            </footer>
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

async function fetchFile () : Promise<FrontMatterResult<BlogEntryAttributes>> {
    const file = await fs.readFile(
        process.cwd() + '/public/static/blog/examples/test.md', 'utf8'
    );
    const content = fm<BlogEntryAttributes>(file);
    return content;
}

export default BlogPage;
