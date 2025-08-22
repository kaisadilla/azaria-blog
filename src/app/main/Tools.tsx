import React, { useState } from 'react';

import styles from "./Tools.module.scss"
import MouseOverBackground from '@/components/MouseOverBackground';
import { $cl } from '@/utils';

export interface ToolsProps {
    
}

function Tools (props: ToolsProps) {
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
                <div className={styles.title}>Tools</div>
            </div>
        </div>
    );
}

export default Tools;
