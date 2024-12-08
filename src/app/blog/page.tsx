import React from 'react';
import styles from "./page.module.scss";
import { promises as fs } from 'fs';
import { BlogEntryAttributes } from './BlogEntry';
import fm, { FrontMatterResult } from 'front-matter';
import { Pagination, Text } from '@mantine/core';
import EntryList from './EntryList';

export interface BlogPageProps {
    
}

async function BlogPage (props: BlogPageProps) {
    const entries = await getEntries();

    return (
        <div className={styles.page}>
            <EntryList entries={entries} />
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
        entries.push(content);
    }

    return entries.sort(
        (a, b) => b.attributes.created.getTime() - a.attributes.created.getTime()
    );
}

export default BlogPage;
