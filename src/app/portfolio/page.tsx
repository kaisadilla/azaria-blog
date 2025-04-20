'use client';

import React, { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import AzariaSvg from '@/assets/AzariaSvg';
import { $cl } from '@/utils';
import { Typewriter } from 'react-simple-typewriter';
import { ScrollArea, Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

import hexSeparator from '@src/assets/img/portfolio/hex_separation_shadows.png';
import iconPlaceholder from '@src/assets/img/portfolio/placeholder_img.png';

import NoProjectShowcase from './NoProjectShowcase';
import { usePlaySound } from '@/hooks/usePlaySound';
import HexSeparatorSvg from '@/assets/HexSeparatorSvg';

enum PageState {
    Initial,
    LogoIntroFinished,
    LogoRemovalStarted,
    LogoRemovalEnded,
};

export interface PortfolioPageProps {

}

function PortfolioPage (props: PortfolioPageProps) {
    const { play: playGlitch } = usePlaySound("/sfx/glitch_0.ogg");

    const [state, setState] = useState<PageState>(PageState.Initial);

    useEffect(() => {
        function handleKeyPress (evt: any) {
            //if ((evt.key === ' ' || evt.key === 'Enter') === false) return;
            if (state >= PageState.LogoRemovalStarted) return;

            setState(PageState.LogoRemovalStarted);
            playGlitch();
        }
        
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('touchend', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('touchend', handleKeyPress);
        }
    }, [state, playGlitch]);

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
                <div className={$cl(
                    styles.pressKey,
                    state == PageState.LogoIntroFinished && styles.appear
                    )}>
                    Press any key to continue.
                </div>
            </div>}
            {state >= PageState.LogoRemovalEnded && <div className={styles.content}>
                <div className={styles.projectList}>
                    <div className={styles.separatorContainer}>
                        <HexSeparatorSvg
                            className={styles.separator}
                            shadowedClass={styles.shadowed}
                            //style={{backgroundImage: `url(${hexSeparator.src})`}}
                        />
                    </div>
                    <ScrollArea
                        classNames={{
                            root: styles.list,
                            scrollbar: styles.scrollbar,
                            thumb: styles.thumb
                        }}
                        scrollbars='y'
                        offsetScrollbars='y'
                        type='always'
                        scrollbarSize="1.5em"
                    >
                        <_ListItem
                            name="Assetto Corsa"
                            description="A content manager and launcher for the racing simulator 'Assetto Corsa'."
                            tags={["Electron", "React", "TypeScript", "Sass"]}
                        />
                        <_ListItem
                            name="Leaflys"
                            description="A GeoJSON document creator and editor."
                            tags={["React", "JavaScript", "Leaflet", "Turf"]}
                        />
                        <_ListItem
                            name="aracnephobia.com"
                            description="A website and portfolio."
                            tags={["React", "TypeScript", "Sass"]}
                        />
                        <_ListItem
                            name="SPlatform"
                            description="A Super Mario-like platformer game with a custom level editor."
                            tags={["SFML", "C#", "Electron", "TypeScript", "Pixi.js", "Monaco editor"]}
                        />
                    </ScrollArea>
                </div>
                <div className={styles.showcase}>
                    <NoProjectShowcase />
                </div>
            </div>}
        </div>
    );

    function handleLogoAnimationEnd (evt: React.AnimationEvent) {
        if (evt.animationName === styles.drawBorder) {
            setState(Math.max(state, PageState.LogoIntroFinished));
        }
        if (evt.animationName === styles.logoGlitchOut) {
            setState(Math.max(state, PageState.LogoRemovalEnded));
        }
    }
}

interface _ListItemProps {
    name: string;
    description: string;
    tags: string[];
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!·$%&/()=";

function _ListItem ({
    name,
    description,
    tags,
}: _ListItemProps) {
    const [nameDisplay, setNameDisplay] = useState(name);
    const [descDisplay, setDescDisplay] = useState(description);
    const [tagsDisplay, setTagsDisplay] = useState(tags);

    return (
        <div className={styles.item} onMouseEnter={handleMouseEnter}>
            <img className={styles.icon} src={iconPlaceholder.src} />
            <div className={styles.description}>
                <div className={styles.name}>
                    {nameDisplay}
                </div>
                <div className={styles.description}>
                    {descDisplay}
                </div>
                <div className={styles.techs}>
                    {tagsDisplay.map((t, i) => <div key={i}>{t}</div>)}
                </div>
            </div>
        </div>
    );

    function handleMouseEnter () {
        const nameInterval = 800 / name.length;
        const descInterval = 800 / description.length;

        for (let i = 0; i < name.length; i++) {
            setTimeout(
                () => setNameDisplay(getPartialName(name, i)),
                i * nameInterval
            );
        }
        for (let i = 0; i < description.length; i++) {
            setTimeout(
                () => setDescDisplay(getPartialName(description, i)),
                i * descInterval
            );
        }

        for (let t = 0; t < tags.length; t++) {
            const tag = tags[t];
            const tagInterval = 800 / tag.length;

            for (let i = 0; i < tag.length; i++) {
                setTimeout(
                    () => setTagsDisplay(prev => {
                        const arr = [...prev];
                        arr[t] = getPartialName(tag, i);

                        return arr;
                    }),
                    i * tagInterval
                );
            }
        }
    }

    function getPartialName (str: string, chars: number) : string {
        let partialStr = "";

        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                partialStr += str[i];
            }
            else if (i <= chars) {
                partialStr += str[i];
            }
            else {
                partialStr += LETTERS[Math.floor(Math.random() * LETTERS.length)];
            }
        }

        return partialStr;
    }
}


export default PortfolioPage;
