'use client';

import React, { useEffect, useState } from 'react';
import styles from "./BlogHeader.module.scss";
import Link from 'next/link';
import { fontTitle } from './fonts/fonts';
import { getClassString } from '@/utils';

export interface BlogHeaderProps {
    
}

function BlogHeader (props: BlogHeaderProps) {
    const [isShrunk, setShrunk] = useState(false);

    useEffect(() => {
        const $scrollableBody = document.getElementById("scrollableBody");
        if ($scrollableBody === null) return;
        console.log("Adding stuff");

        const handleScroll = () => setShrunk($scrollableBody.scrollTop > 2);

        $scrollableBody?.addEventListener('scroll', handleScroll);

        return () => $scrollableBody?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={getClassString(styles.header, isShrunk && styles.shrunk)}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <h1 className={`${styles.logo} ${fontTitle.className}`}>Azaria</h1>
                </Link>
                <div className={styles.sections}>
                    <Link href="/">Entries</Link>
                    <Link href="/projects">My projects</Link>
                    <Link href="/gadgets">Gadgets</Link>
                    <Link href="/snippets">Snippets</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </header>
    );
}

export default BlogHeader;
