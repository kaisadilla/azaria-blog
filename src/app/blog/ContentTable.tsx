'use client';

import React, { useEffect, useState } from 'react';
import styles from "./ContentTable.module.scss";
import Link from 'next/link';
import { getClassString } from '@/utils';

export interface ContentTableProps {
    headings: string[];
}

function ContentTable ({
    headings,
}: ContentTableProps) {
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.contentTable}>
            <div className={styles.headings}>
                <div className={styles.headings}>
                    {headings?.map((h, i) => <_HeadingLink
                        key={h}
                        heading={h}
                        headingIndex={i}
                        activeIndex={index}
                        //onClick={() => setIndex(i)}
                    />)}
                </div>
            </div>
        </div>
    );

    function handleScroll () {
        const yThreshold = window.innerHeight / 3;
        
        let newIndex = 0;

        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];

            const el = document.getElementById(getHeadingId(heading));
            if (!el) continue;

            const yClient = el.getBoundingClientRect().y;
            if (yClient < yThreshold) newIndex = i;
        }

        setIndex(newIndex);
    }
}

interface _HeadingLinkProps {
    heading: string;
    headingIndex: number;
    activeIndex: number;
    onClick?: () => void;
}

function _HeadingLink ({
    heading,
    headingIndex,
    activeIndex,
    onClick,
}: _HeadingLinkProps) {
    const classStr = getClassString(
        styles.heading,
        headingIndex === activeIndex && styles.active,
    );

    return (
        <Link
            className={classStr}
            href={"#" + getHeadingId(heading)}
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
                {heading.substring(2)}
            </div>
        </Link>
    );
}


function getHeadingId (heading: string) {
    return heading.substring(2).toLocaleLowerCase().replaceAll(" ", "-");
}

export default ContentTable;
