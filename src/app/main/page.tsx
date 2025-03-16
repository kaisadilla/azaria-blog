'use client';

import React, { useEffect, useState } from 'react';
import styles from "./page.module.scss"
import { getClassString } from '@/utils';
import AzariaLogo from '@/components/AzariaLogo';

export interface MainPageProps {
    
}

function MainPage (props: MainPageProps) {
    const [isCoverRemoved, setCoverRemoved] = useState(false);

    useEffect(() => {
        setCoverRemoved(true);
    }, []);

    return (
        <div className={styles.viewport}>
            <div className={getClassString(
                styles.cover,
                isCoverRemoved && styles.removed,
            )}>
                <img
                    className={styles.hexagons}
                    src="/img/blog_header.png"
                    alt=""
                    draggable={false}
                />
            </div>

            <div className={styles.logo}>
                <AzariaLogo />
            </div>
        </div>
    );
}

export default MainPage;
