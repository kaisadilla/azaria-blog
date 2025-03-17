import React, { useState } from 'react';

import styles from "./Blog.module.scss"
import MouseOverBackground from '@/components/MouseOverBackground';
import { $cl } from '@/utils';

export interface BlogProps {
    
}

function Blog (props: BlogProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <MouseOverBackground
                className={styles.bg}
                visible={isHovered}
                zIndex={0}
            />
            <div className={$cl(styles.content, isHovered && styles.hovered)}>
                <div className={styles.title}>Blog</div>
            </div>
        </div>
    );
}

export default Blog;
