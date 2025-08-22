import React from 'react';
import styles from "./page.module.scss";
import { promises as fs } from 'fs';
import { BlogEntryAttributes } from '../BlogEntry';
import fm, { FrontMatterResult } from 'front-matter';
import { Pagination, Text } from '@mantine/core';
import EntryList from '@/components/EntryList';
import path from 'path';

export interface BlogPageProps {
    
}

async function BlogPage (props: BlogPageProps) {
    const entries = await getEntries();

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Latest entries</h1>
            <EntryList entries={[
                ...entries, ...entries, ...entries, ...entries, ...entries, ...entries,
                ...entries, ...entries, ...entries, ...entries, ...entries, ...entries,
                ...entries, ...entries, ...entries, ...entries, ...entries, ...entries,
                ...entries, ...entries, ...entries, ...entries, ...entries, ...entries,
            ]} />
        </div>
    );
}

/**
 * Reads and returns all entries in the blog folder, sorted from newest to oldest
 * (according to their 'created' attribute).
 */
async function getEntries () : Promise<FrontMatterResult<BlogEntryAttributes>[]> {
    const entries = [] as FrontMatterResult<BlogEntryAttributes>[];

    const files = await fs.readdir(
        process.cwd() + "/public/static/blog/"
    );

    for (const f of files) {
        const txt = await fs.readFile(
            process.cwd() + `/public/static/blog/${f}`, 'utf8'
        );
        const content = fm<BlogEntryAttributes>(txt);
        content.attributes.id = path.parse(f).name;
        entries.push(content);
    }

    return entries.sort(
        (a, b) => b.attributes.created.getTime() - a.attributes.created.getTime()
    ).filter(e => e.attributes.published);
}

export default BlogPage;
