'use client';

import AzariaSvg from '@/assets/AzariaSvg';
import { $cl } from '@/utils';
import { ScrollArea } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import styles from './ClientLayout.module.scss';

import drawing_aracnephobia from '@src/assets/img/portfolio/drawing_aracnephobia.png';
import drawing_al from '@src/assets/img/portfolio/drawing_assetto_lega.png';
import drawing_emerald from '@src/assets/img/portfolio/drawing_emerald.png';
import drawing_leaflys from '@src/assets/img/portfolio/drawing_leaflys.png';
import drawing_shattered from '@src/assets/img/portfolio/drawing_shattered.png';

import HexSeparatorSvg from '@/assets/HexSeparatorSvg';
import { usePlaySound } from '@/hooks/usePlaySound';
import Link from 'next/link';
import NavBar from './NavBar';

export enum PageState {
  Initial,
  LogoIntroFinished,
  LogoRemovalStarted,
  LogoRemovalEnded,
};

type ShowcaseId = 'assetto_lega'
  | 'yerevan'
  | 'reforged'
  | 'aracnephobia'
  | 'splatform'
  ;

export interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayout ({
  children,
}: ClientLayoutProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  const glitchSound = usePlaySound("/sfx/glitch_0.ogg");
  const bgMusicSound = usePlaySound(
    "/sfx/cyberpunk-bg-1.ogg", {
      volume: 0.2,
      loop: true,
      muted: false
    }
  );

  const [state, setState] = useState<PageState>(PageState.Initial);
  const [showcase, setShowcase] = useState<ShowcaseId | null>(null);
  const [isCrtFixed, setCrtFixed] = useState(false);

  useEffect(() => {
    const muted = localStorage.getItem('portfolio-bg-music-muted') === 'true'
    bgMusicSound.setMuted(muted);
  }, []);

  useEffect(() => {
    if (pageRef.current === null) return;

    const neonColor = localStorage.getItem('portfolio-neon-color');
    if (neonColor !== null) {
      pageRef.current.style.setProperty("--current-neon", neonColor);
    }

    const crtFixed = localStorage.getItem('portfolio-crt-fixed');

    const style = pageRef.current?.style;
    if (crtFixed === "true" && style) {
      setCrtFixed(crtFixed === "true");
      fixCrtCss(style);
    }

  }, [pageRef.current]);

  useEffect(() => {
    function handleKeyPress (evt: any) {
      //if ((evt.key === ' ' || evt.key === 'Enter') === false) return;
      if (state >= PageState.LogoRemovalStarted) return;

      setState(PageState.LogoRemovalStarted);
      glitchSound.play();

      setTimeout(() => {
        bgMusicSound.play();
      }, 500);
    }
    
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('touchend', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('touchend', handleKeyPress);
    }
  }, [state, glitchSound.play, bgMusicSound.play]);

  return (
    <div ref={pageRef} className={styles.page}>
      <NavBar
        state={state}
        isCrtFixed={isCrtFixed}
        isMusicMuted={bgMusicSound.muted}
        setNeonColor={setNeonColor}
        onFixCrt={handleFixCrt}
        onMuteMusic={handleBgMusicMute}
      />
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
              slug="assetto-lega"
              name="Assetto Lega"
              description="A content manager and launcher for the racing simulator 'Assetto Corsa'."
              drawing={drawing_al.src}
              tags={["Electron", "React", "TypeScript", "Sass"]}
            />
            <_ListItem
              slug="yerevan"
              name="Yerevan"
              description="A GeoJSON document creator and editor."
              drawing={drawing_leaflys.src}
              tags={["React", "JavaScript", "Leaflet", "Turf"]}
            />
            <_ListItem
              slug="lrc-workbench"
              name="LRC Workbench"
              description="A .lrc document authoring and edition tool."
              drawing={drawing_leaflys.src}
              tags={["React", "JavaScript", "Leaflet", "Turf"]}
            />
            <_ListItem
              slug="pkmn-emerald"
              name="Kaisa's Pokémon Emerald"
              description="A modded version of Pokémon Emerald."
              drawing={drawing_emerald.src}
              tags={["C", "Assembly", "Game Boy Advance"]}
            />
            <_ListItem
              slug="aracnephobia"
              name="aracnephobia.com"
              description="A website and portfolio."
              drawing={drawing_aracnephobia.src}
              tags={["React", "TypeScript", "Sass"]}
            />
            <_ListItem
              slug="splatform"
              name="SPlatform"
              description="A Super Mario-like platformer game with a custom level editor."
              drawing={drawing_al.src}
              tags={["SFML", "C#", "Electron", "Pixi.js", "Monaco"]}
            />
            <_ListItem
              slug="shattered"
              name="Shattered"
              description="A small Minecraft-like game engine made in Unity."
              drawing={drawing_shattered.src}
              tags={["Unity Engine", "C#"]}
            />
          </ScrollArea>
        </div>
        <div className={styles.showcase}>
          {children}
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

  function setNeonColor (col: string) {
    pageRef.current?.style.setProperty("--current-neon", col);
    localStorage.setItem('portfolio-neon-color', col);
  }

  function handleFixCrt () {
    const style = pageRef.current?.style;
    if (!style) return;

    if (isCrtFixed) {
      setCrtFixed(false);
      localStorage.setItem('portfolio-crt-fixed', "false");

      breakCrtCss(style);
    }
    else {
      setCrtFixed(true);
      localStorage.setItem('portfolio-crt-fixed', "true");

      fixCrtCss(style);
    }
  }

  function handleBgMusicMute (muted: boolean) {
    bgMusicSound.setMuted(muted);
    localStorage.setItem('portfolio-bg-music-muted', muted ? 'true' : 'false');
  }

  function fixCrtCss (style: CSSStyleDeclaration) {
    style.setProperty("--flicker-speed", "0s");
    style.setProperty("--crt-strength", "0");
  }

  function breakCrtCss (style: CSSStyleDeclaration) {
    style.removeProperty("--flicker-speed");
    style.setProperty("--crt-strength", "0.1");
  }
}

interface _ListItemProps {
  slug: string;
  name: string;
  description: string;
  drawing: string;
  tags: string[];
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!·$%&/()=";

function _ListItem ({
  slug,
  name,
  description,
  drawing,
  tags,
}: _ListItemProps) {
  const [nameDisplay, setNameDisplay] = useState(name);
  const [descDisplay, setDescDisplay] = useState(description);
  const [tagsDisplay, setTagsDisplay] = useState(tags);

  return (
    <Link
      className={styles.item}
      onMouseEnter={handleMouseEnter}
      href={`/portfolio/${slug}`}
    >
    <div className={styles.icon}>
      <div
        className={styles.img2}
        style={{maskImage: `url(${drawing})`}}
      />
    </div>
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
    </Link>
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


export default ClientLayout;
