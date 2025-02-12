'use client';

import React, { useState } from 'react';
import styles from "./EntryList.module.scss";
import { FrontMatterResult } from 'front-matter';
import { BlogEntryAttributes } from './BlogEntry';
import { Pagination, Text } from '@mantine/core';
import Link from 'next/link';
import { MaterialSymbol } from 'react-material-symbols';

const ITEMS_PER_PAGE = 10;

export interface EntryListProps {
    entries: FrontMatterResult<BlogEntryAttributes>[];
}

function EntryList ({
    entries,
}: EntryListProps) {
    const [page, setPage] = useState(1);

    const pageCount = Math.ceil(entries.length / ITEMS_PER_PAGE);
    const firstEntry = (page - 1) * ITEMS_PER_PAGE;
    const lastEntry = Math.min(firstEntry + ITEMS_PER_PAGE, entries.length);

    return (
        <div className={styles.entryList}>
            <Pagination
                withEdges
                total={pageCount}
                value={page}
                onChange={setPage}
            />
            <div className={styles.entries}>
                {entries.slice(firstEntry, lastEntry).map((e, i) => <>
                    <_Entry
                        key={firstEntry + i}
                        entry={e}
                    />
                    {(firstEntry + i) < (lastEntry - 1) && <hr />}
                </>)}
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
    const link = `/e/${entry.attributes.id}`;

    return (
        <div className={styles.entry}>
            <div className={styles.thumbnail}>
                <Link href={link}>
                    <img
                        className={styles.thumbnailImg}
                        src={`/img/blog/${entry.attributes.thumbnail}`}
                    />
                </Link>
            </div>
            <div className={styles.content}>
                <Link className={styles.title} href={link}>
                    <h2 className={styles.title}>
                        {entry.attributes.title}
                    </h2>
                </Link>
                <Text
                    className={styles.summary}
                    lineClamp={4}
                >
                    {entry.attributes.summary ?? ""}
                </Text>
                <Link className={styles.readMore} href={link}>
                    <span className={styles.text}>Read more</span>
                    <div className={styles.arrowContainer}>
                        <MaterialSymbol className={styles.arrow} icon='arrow_forward_ios' />
                        <MaterialSymbol className={styles.arrow} icon='arrow_forward_ios' />
                        <MaterialSymbol className={styles.arrow} icon='arrow_forward_ios' />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default EntryList;
