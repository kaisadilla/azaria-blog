import React, { useState } from 'react';

import styles from "./AboutMe.module.scss"
import MouseOverBackground from '@/components/MouseOverBackground';
import { $cl } from '@/utils';

export interface AboutMeProps {
    
}

function AboutMe (props: AboutMeProps) {
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
                <div className={styles.title}>About me</div>
            </div>
        </div>
    );
}

export default AboutMe;
