'use client';

import React, { useEffect, useState } from 'react';
import styles from "./page.module.scss"
import { $cl } from '@/utils';
import AzariaLogo from '@/components/AzariaLogo';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Blog from './Blog';
import Tools from './Tools';
import Snippets from './Snippets';
import { Tooltip } from '@mantine/core';

export interface MainPageProps {
    
}

function MainPage (props: MainPageProps) {
    const [isCoverRemoved, setCoverRemoved] = useState(false);

    useEffect(() => {
        setTimeout(() => setCoverRemoved(true), 200);
    }, []);

    return (
        <div className={styles.viewport}>
            <div className={$cl(styles.cover, isCoverRemoved && styles.removed)}>
                <img
                    className={styles.hexagons}
                    src="/img/blog_header.png"
                    alt=""
                    draggable={false}
                />
            </div>

            <Tooltip.Floating
                position='top'
                label="'azaria.dev' was already taken :("
            >
                <div className={styles.logo}>
                    <AzariaLogo />
                </div>
            </Tooltip.Floating>
            <div className={styles.sectionTable}>
                <div className={$cl(styles.section, styles.aboutMe)}>
                    <AboutMe />
                </div>
                <div className={$cl(styles.section, styles.myProject)}>
                    <Projects />
                </div>
                <div className={$cl(styles.section, styles.blog)}>
                    <Blog />
                </div>
                <div className={$cl(styles.section, styles.tools)}>
                    <Tools />
                </div>
                <div className={$cl(styles.section, styles.snippets)}>
                    <Snippets />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
