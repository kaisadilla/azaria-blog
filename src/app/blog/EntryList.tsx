'use client';

import React, { useState } from 'react';
import styles from "./EntryList.module.scss";
import { FrontMatterResult } from 'front-matter';
import { BlogEntryAttributes } from './BlogEntry';
import { Pagination, Text } from '@mantine/core';

export interface EntryListProps {
    entries: FrontMatterResult<BlogEntryAttributes>[];
}

function EntryList ({
    entries,
}: EntryListProps) {
    const [page, setPage] = useState(1);

    return (
        <div className={styles.entryList}>
            <h1 className={styles.title}>Latest entries</h1>
            <Pagination
                withEdges
                total={10}
                value={page}
                onChange={setPage}
            />
            <div className={styles.entries}>
                {entries.map((e, i) => <_Entry
                    key={i}
                    entry={e}
                />)}
                {entries.map((e, i) => <_Entry
                    key={i}
                    entry={e}
                />)}
                {entries.map((e, i) => <_Entry
                    key={i}
                    entry={e}
                />)}
            </div>
        </div>
    );
}

interface _EntryProps {
    entry: FrontMatterResult<BlogEntryAttributes>;
}

function _Entry ({
    entry,
}: _EntryProps) {

    return (
        <div className={styles.entry}>
            <div className={styles.thumbnail}>
                <img src={`/img/blog/${entry.attributes.thumbnail}`} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>
                    {entry.attributes.title}
                </h2>
                <Text
                    className={styles.summary}
                    lineClamp={5}
                >
                    {entry.attributes.summary ?? ""}
                </Text>
                <div className={styles.readMore}>
                    Read more
                </div>
            </div>
        </div>
    );
}

export default EntryList;
