import AzariaSvg from '@/assets/AzariaSvg';
import { $cl } from '@/utils';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mantine/core';
import Link from 'next/link';
import { MaterialSymbol } from 'react-material-symbols';
import { PageState } from './ClientLayout';
import styles from './NavBar.module.scss';

export interface NavBarProps {
  state: PageState;
  isCrtFixed: boolean;
  isMusicMuted: boolean;
  setNeonColor: (col: string) => void;
  onFixCrt: () => void;
  onMuteMusic: (muted: boolean) => void;
}

function NavBar ({
  state,
  isCrtFixed,
  isMusicMuted,
  setNeonColor,
  onFixCrt,
  onMuteMusic,
}: NavBarProps) {

  return (
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
        styles.styleRibbon,
        state >= PageState.LogoRemovalEnded && styles.appear
      )}>
        <Tooltip.Floating
          position='bottom'
          offset={30}
          label="Change the color of the neon lights!"
        >
          <div className={styles.leds}>
            <div
              className={styles.pink}
              onClick={() => setNeonColor("var(--neon-pink)")}
            />
            <div
              className={styles.blue}
              onClick={() => setNeonColor("var(--neon-blue)")}
            />
            <div
              className={styles.yellow}
              onClick={() => setNeonColor("var(--neon-yellow)")}
            />
            <div
              className={styles.rainbow}
              onClick={() => setNeonColor("var(--neon-rainbow)")}
            />
          </div>
        </Tooltip.Floating>

        <Tooltip.Floating
          position='bottom'
          offset={30}
          label="Disable the CRT screen's flickering."
        >
          <button
            className={styles.crtButton}
            onClick={onFixCrt}
          >
            <div className={styles.bordered}>
              {isCrtFixed ? "Break CRT" : "Fix CRT"}
            </div>
          </button>
        </Tooltip.Floating>

        <button
          className={styles.mute}
          onClick={() => onMuteMusic(!isMusicMuted)}
        >
          <div>
            <MaterialSymbol
              className={styles.mute}
              icon={isMusicMuted ? 'volume_off' : 'volume_up'}
            />
          </div>
        </button>

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
  );
}

export default NavBar;
