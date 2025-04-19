'use client';

import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import AzariaSvg from '@/assets/AzariaSvg';
import { $cl } from '@/utils';
import { Typewriter } from 'react-simple-typewriter';
import { Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

import hexSeparator from '@src/assets/img/portfolio/hex_separation_shadows.png';
import NoProjectShowcase from './NoProjectShowcase';

enum PageState {
    Initial,
    LogoIntroFinished,
    LogoRemovalStarted,
    LogoRemovalEnded,
};

export interface PortfolioPageProps {

}

function PortfolioPage (props: PortfolioPageProps) {
    const [state, setState] = useState<PageState>(PageState.Initial);

    useEffect(() => {
        function handleKeyPress (evt: any) {
            if ((evt.key === ' ' || evt.key === 'Enter') === false) return;
            if (state >= PageState.LogoRemovalEnded) return;

            setState(PageState.LogoRemovalEnded);
        }
        
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('touchend', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('touchend', handleKeyPress);
        }
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.navbar}>
                <AzariaSvg className={$cl(
                    styles.logo,
                    state >= PageState.LogoRemovalEnded && styles.appear
                )} />
                <div className={$cl(
                    styles.sections,
                    state >= PageState.LogoRemovalEnded && styles.appear
                )}>
                    <Tooltip.Floating
                        position='bottom'
                        offset={30}
                        label="All of my blog posts."
                    >
                        <Link href="/blog/index">Blog</Link>
                    </Tooltip.Floating>

                    <Link href="/main/utils">Portfolio</Link>

                    <Tooltip.Floating
                        position='bottom'
                        offset={30}
                        label="An overview of each of my personal projects."
                    >
                        <Link href="/main/projects">My projects</Link>
                    </Tooltip.Floating>

                    <Tooltip.Floating
                        position='bottom'
                        offset={30}
                        label="Code snippets for common problems."
                    >
                        <Link href="/main/snippets">Snippets</Link>
                    </Tooltip.Floating>

                    <Link href="/main/about">About me</Link>
                </div>
                <div className={$cl(
                    styles.icons,
                    state >= PageState.LogoRemovalEnded && styles.appear
                )}>
                    <Tooltip.Floating
                        label="Blog's repo!"
                        position='bottom'
                        offset={30}
                    >
                        <a target="_blank" href="https://github.com/kaisadilla/azaria-blog">
                            <FontAwesomeIcon className={styles.fa} icon={faGithub} />
                        </a>
                    </Tooltip.Floating>
                    <Tooltip.Floating
                        label="Europe stands with Ukraine."
                        position='bottom'
                        offset={30}
                    >
                        <a target="_blank" href="https://u24.gov.ua/">
                            <img className={styles.img} src="/img/flag_eu_ukraine.png" alt="ukr" />
                        </a>
                    </Tooltip.Floating>
                </div>
            </div>
            {state < PageState.LogoRemovalEnded && <div className={styles.landing}>
                <AzariaSvg
                    className={$cl(
                        styles.azaria,
                        state >= PageState.LogoRemovalStarted && styles.remove
                    )}
                    onAnimationEnd={handleLogoAnimationEnd}
                />
            </div>}
            {state >= PageState.LogoRemovalEnded && <div className={styles.content}>
                <div className={styles.projectList}>
                    <img className={styles.separator} src={hexSeparator.src} />
                </div>
                <div className={styles.showcase}>
                    <NoProjectShowcase />
                </div>
            </div>}
        </div>
    );

    function handleLogoAnimationEnd (evt: React.AnimationEvent) {
        if (evt.animationName === styles.logoGlitchOut) {
            setState(PageState.LogoRemovalEnded);
        }
    }
}

export default PortfolioPage;
