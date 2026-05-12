'use client';

import AzariaSvg from '@/assets/AzariaSvg';
import { $cl } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';
import styles from './ClientLayout.module.scss';

import { usePlaySound } from '@/hooks/usePlaySound';
import NavBar from './NavBar';
import ProjectList from './ProjectList';

export enum PageState {
  Initial,
  LogoIntroFinished,
  LogoRemovalStarted,
  LogoRemovalEnded,
};

export interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayout ({
  children,
}: ClientLayoutProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  const glitchSound = usePlaySound("/sfx/glitch-0.ogg");
  const bgMusicSound = usePlaySound(
    "/sfx/cyberpunk-bg-1.ogg", {
      volume: 0.2,
      loop: true,
      muted: false
    }
  );

  const [state, setState] = useState<PageState>(PageState.Initial);
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
        <ProjectList />
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

export default ClientLayout;
