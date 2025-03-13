import React from 'react';
import styles from "./BlogFooter.module.scss";

export interface BlogFooterProps {
    
}

function BlogFooter (props: BlogFooterProps) {

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                
            </div>
        </footer>
    );
}

export default BlogFooter;
