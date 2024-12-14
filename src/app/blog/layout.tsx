import React from 'react';
import BlogPage from './page';
import Head from 'next/head';
import BlogHeader from './BlogHeader';
import BlogFooter from './BlogFooter';
import { fontBody } from '../fonts/fonts';
import styles from "./layout.module.scss";
import 'react-material-symbols/rounded';
import "../styles.scss";
import { MantineProvider } from '@mantine/core';

export interface BlogLayoutProps {
    children: React.ReactNode;
}

function BlogLayout ({
    children,
}: BlogLayoutProps) {

    return (
        <MantineProvider>
            
        <div id="scrollableBody" className={`${styles.blogPage} ${fontBody.className}`}>
            <BlogHeader />
            <div className={styles.pageBody}>
                {children}
            </div>
            <BlogFooter />
        </div>

        </MantineProvider>
    );
}

export default BlogLayout;
