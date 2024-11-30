import React from 'react';
import styles from "./BlogHeader.module.scss";
import Link from 'next/link';

export interface BlogHeaderProps {
    
}

function BlogHeader (props: BlogHeaderProps) {

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link href="/blog">
                    <h1 className={styles.logo}>Azaria</h1>
                </Link>
                <div className={styles.sections}>
                    <Link href="/blog/entries">Entries</Link>
                    <Link href="/blog/projects">My projects</Link>
                    <Link href="/blog/gadgets">Gadgets</Link>
                    <Link href="/blog/snippets">Snippets</Link>
                    <Link href="/blog/about">About</Link>
                </div>
            </div>
            <img
                className={styles.headerEnd}
                src="/img/blog_header.png"
                alt=""
                draggable={false}
            />
        </header>
    );
}

export default BlogHeader;
