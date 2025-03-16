import { redirect } from 'next/navigation';
import React from 'react';

export interface BlogPageProps {
    
}

function BlogPage (props: BlogPageProps) {
    redirect('/blog/index');

    return (
        <div>
            Redirection failed. <a href="/blog/index">Go to index.</a>
        </div>
    );
}

export default BlogPage;
