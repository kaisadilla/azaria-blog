import React from 'react';
import styles from "./BlogFooter.module.scss";

export interface BlogFooterProps {
    
}

function BlogFooter (props: BlogFooterProps) {

    return (
        <footer className={styles.footer}>
            <img
                className={styles.footerStart}
                src="/img/blog_header.png"
                alt=""
                draggable={false}
            />
            <div className={styles.footerContent}>
                This is the footer
            </div>
        </footer>
    );
}

export default BlogFooter;
