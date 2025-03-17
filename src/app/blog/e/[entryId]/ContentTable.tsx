'use client';

import React, { RefObject, useEffect, useState } from 'react';
import styles from "./ContentTable.module.scss";
import Link from 'next/link';
import { $cl } from '@/utils';
import GithubSlugger from "github-slugger";

export interface ContentTableProps {
    headings: string[];
}

function ContentTable ({
    headings,
}: ContentTableProps) {
    const slugger = new GithubSlugger();

    const [index, setIndex] = useState(0);
    
    const cssPadding = `calc(48px + ${headings.length * 0.8}em)`;
    const headingSlugs = headings.map(h => slugger.slug(h));
    
    // This part highlights the section that is currently being read by the
    // user.
    useEffect(() => {
        const $scrollableBody = document.getElementById("scrollableBody");
        if (!$scrollableBody) return;

        $scrollableBody.addEventListener('scroll', handleScroll);

        return () => {
            $scrollableBody.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={styles.contentTable}
            style={{paddingTop: cssPadding, paddingBottom: cssPadding}}
        >
            <div className={styles.headings}>
                <div className={styles.headings}>
                    <div className={styles.headingContainer}>
                        {headings?.map((h, i) => <_HeadingLink
                            key={h}
                            heading={h}
                            slug={headingSlugs[i]}
                            headingIndex={i}
                            activeIndex={index}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );

    function handleScroll () {
        const yThreshold = window.innerHeight / 3;
        
        let newIndex = 0;
        
        for (let i = 0; i < headings.length; i++) {        
            const el = document.getElementById(headingSlugs[i]);
            if (!el) continue;
        
            const yClient = el.getBoundingClientRect().y;
            if (yClient < yThreshold) newIndex = i;
        }

        setIndex(newIndex);
    }
}

interface _HeadingLinkProps {
    heading: string;
    slug: string;
    headingIndex: number;
    activeIndex: number;
    onClick?: () => void;
}

function _HeadingLink ({
    heading,
    slug,
    headingIndex,
    activeIndex,
    onClick,
}: _HeadingLinkProps) {
    const classStr = $cl(
        styles.heading,
        headingIndex === activeIndex && styles.active,
    );

    return (
        <Link
            className={classStr}
            href={"#" + slug}
            onClick={onClick}
        >
            <div>
                <img
                    className={styles.icon}
                    src={
                        headingIndex === activeIndex
                            ? "/img/blog_hex.png"
                            : "/img/blog_hex_shallow.png"
                    }
                />
                {heading}
            </div>
        </Link>
    );
}

export default ContentTable;
