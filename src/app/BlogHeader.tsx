import React from 'react';
import styles from "./BlogHeader.module.scss";
import Link from 'next/link';
import { fontTitle } from './fonts/fonts';

export interface BlogHeaderProps {
    
}

function BlogHeader (props: BlogHeaderProps) {

    return (
        <header className={styles.header}>
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
