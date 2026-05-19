import HexSeparatorSvg from '@/assets/HexSeparatorSvg';
import { ScrollArea } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import styles from './ProjectList.module.scss';

import { usePlaySound } from '@/hooks/usePlaySound';
import { randomItem } from '@/utils';
import drawing_aracnephobia from '@src/assets/img/portfolio/drawing_aracnephobia.png';
import drawing_al from '@src/assets/img/portfolio/drawing_assetto_lega.png';
import drawing_emerald from '@src/assets/img/portfolio/drawing_emerald.png';
import drawing_leaflys from '@src/assets/img/portfolio/drawing_leaflys.png';
import drawing_shattered from '@src/assets/img/portfolio/drawing_shattered.png';

type ShowcaseId = 'assetto_lega'
  | 'yerevan'
  | 'reforged'
  | 'aracnephobia'
  | 'splatform'
  ;

export interface ProjectListProps {
  
}

function ProjectList (props: ProjectListProps) {

  return (
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
          slug="yerevan"
          name="Yerevan"
          description="A GeoJSON document creator and editor."
          drawing={drawing_leaflys.src}
          tags={["React", "JavaScript", "Leaflet", "Turf"]}
        />
        <_ListItem
          slug="assetto-lega"
          name="Assetto Lega"
          description="A content manager and launcher for the racing simulator 'Assetto Corsa'."
          drawing={drawing_al.src}
          tags={["Electron", "React", "TypeScript", "Sass"]}
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
  );
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

  const decodeSounds = [
    usePlaySound("/sfx/decode-1.ogg"),
    usePlaySound("/sfx/decode-2.ogg"),
    usePlaySound("/sfx/decode-3.ogg"),
    usePlaySound("/sfx/decode-4.ogg"),
  ];

  return (
    <Link
      className={styles.item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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

    decodeSounds.forEach(s => s.stop());

    randomItem(decodeSounds).play(true);

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

  function handleMouseLeave () {
    decodeSounds.forEach(s => s.stop());
  }

  function handleClick () {
    decodeSounds.forEach(s => s.stop());
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

export default ProjectList;
