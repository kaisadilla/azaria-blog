import React from 'react';
import BlogPage from './page';
import Head from 'next/head';

export interface BlogLayoutProps {
    
}

function BlogLayout (props: BlogLayoutProps) {

    return (
        <div>
            <BlogPage />
        </div>
    );
}

export default BlogLayout;
