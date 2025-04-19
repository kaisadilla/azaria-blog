'use client';

import React, { useEffect, useState } from 'react';
import styles from "./BlogHeader.module.scss";
import Link from 'next/link';
import { fontTitle } from '../app/fonts/fonts';
import { $cl } from '@/utils';
import { FloatingPosition, Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import AzariaLogo from './AzariaLogo';

interface TooltipProps {
    position: FloatingPosition;
    offset?: number;
}

const TOOLTIP_UP: TooltipProps = { position: 'top', offset: 12 };
const TOOLTIP_BOTTOM: TooltipProps = { position: 'bottom', offset: 30 };

export interface BlogHeaderProps {
    
}

function BlogHeader (props: BlogHeaderProps) {
    const [isShrunk, setShrunk] = useState(false);
    const [tooltipProps, setTooltipProps] = useState<TooltipProps>(TOOLTIP_UP)

    useEffect(() => {
        const $scrollableBody = document.getElementById("scrollableBody");
        if ($scrollableBody === null) return;
        console.log("Adding stuff");

        const handleScroll = () => {
            if ($scrollableBody.scrollTop > 2) {
                setShrunk(true);
                setTooltipProps(TOOLTIP_BOTTOM)
            }
            else {
                setShrunk(false);
                setTooltipProps(TOOLTIP_UP)
            }
        }

        $scrollableBody?.addEventListener('scroll', handleScroll);

        return () => $scrollableBody?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={$cl(styles.header, isShrunk && styles.shrunk)}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <Tooltip.Floating
                        {...tooltipProps}
                        label="'azaria.dev' was already taken :("
                    >
                        <div className={styles.logo}>
                            <AzariaLogo />
                        </div>
                    </Tooltip.Floating>
                </Link>
                <div className={styles.sections}>
                    <Tooltip.Floating
                        {...tooltipProps}
                        label="All of my blog posts."
                    >
                        <Link href="/blog/index">Entries</Link>
                    </Tooltip.Floating>

                    <Link href="/portfolio">Portfolio</Link>

                    <Tooltip.Floating
                        {...tooltipProps}
                        label="A small overview of each of my personal projects."
                    >
                        <Link href="/main/projects">My projects</Link>
                    </Tooltip.Floating>

                    <Tooltip.Floating
                        {...tooltipProps}
                        label="Some cool utilities and applications!"
                    >
                        <Link href="/main/utils">Free tools!</Link>
                    </Tooltip.Floating>

                    <Tooltip.Floating
                        {...tooltipProps}
                        label="Code snippets for common problems."
                    >
                        <Link href="/main/snippets">Snippets</Link>
                    </Tooltip.Floating>

                    <Link href="/main/about">About me</Link>
                </div>
                <div className={styles.extraIcons}>
                    <Tooltip.Floating
                        {...tooltipProps}
                        label="Blog's repo!"
                    >
                        <a target="_blank" href="https://github.com/kaisadilla/azaria-blog">
                            <FontAwesomeIcon className={styles.fa} icon={faGithub} />
                        </a>
                    </Tooltip.Floating>
                    <Tooltip.Floating
                        {...tooltipProps}
                        label="Europe stands with Ukraine."
                    >
                        <a target="_blank" href="https://u24.gov.ua/">
                            <img className={styles.img} src="/img/flag_eu_ukraine.png" alt="ukr" />
                        </a>
                    </Tooltip.Floating>
                </div>
            </div>
        </header>
    );
}

export default BlogHeader;
