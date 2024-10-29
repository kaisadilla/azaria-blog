import Clock from '@/components/Clock';
import WIcon from '@/components/WIcon';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import React from 'react';
import styles from './page.module.scss';
import { poppins } from "@/app/fonts/fonts";

async function BlogPage () {
    const entry = await fetchEntry();

    const components = {
        WIcon,
        Clock,
    };

    return (
        <div>
            <div className={`${styles.blogEntry} ${poppins.className}`}>
                {<MDXRemote
                    source={entry}
                    components={components}
                />}
            </div>
        </div>
    );

    async function fetchEntry () {
        //console.log(import.meta.resolve("./kek"));
        const res = await fetch('http://localhost:3000/static/blog/examples/test.md');
        const txt = await res.text();
        return txt;
    }
}

export default BlogPage;

//"Some **mdx** text, with[out] a component. <WIcon icon='recycle_bin' name='lmao' position={{x: 5, y: 3}} />"