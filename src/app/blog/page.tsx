import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import React from 'react';

async function BlogPage () {

    return (
        <div>
            {<MDXRemote
                source={"Some **mdx** text, with[out] a component."}
            />}
        </div>
    );
}

export default BlogPage;
