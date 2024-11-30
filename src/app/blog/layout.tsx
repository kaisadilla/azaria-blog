import React from 'react';
import BlogPage from './page';
import Head from 'next/head';
import BlogHeader from './BlogHeader';
import BlogFooter from './BlogFooter';
import { fontBody } from '../fonts/fonts';
import styles from "./layout.module.scss";
import "../styles.scss";

export interface BlogLayoutProps {
    children: React.ReactNode;
}

function BlogLayout ({
    children,
}: BlogLayoutProps) {

    return (
        <div className={`${styles.blogPage} ${fontBody.className}`}>
            <BlogHeader />
            {children}
            <BlogFooter />
        </div>
    );
}

export default BlogLayout;
