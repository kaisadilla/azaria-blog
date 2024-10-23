'use client';

import React, { useEffect, useRef, useState } from 'react';
import WIcon from './WIcon';

import styles from "./IconGrid.module.scss";
import { clampNumber, Vec2 } from '@/utils';
import { OsWindow, OsWindowType, PartialOsWindow } from '@/logic/OsWindow';
import { useOsContext } from '@/app/context';
import { useContextMenu } from 'mantine-contextmenu';

type IconId = 'recycle_bin' | 'about_me' | 'qualifications' | 'blog' | 'game';
type IconPositionDictionary = {[K in IconId]: Vec2};

export interface IconGridProps {
    
}

function IconGrid (props: IconGridProps) {
    const ctx = useOsContext();
    const { showContextMenu } = useContextMenu();

    const ref = useRef<HTMLDivElement>(null);
    const [selectedIcon, setSelectedIcon] = useState<IconId | null>(null);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [topleft, setTopleft] = useState({top: 0, left: 0});

    const [iconPos, setIconPos] = useState<IconPositionDictionary>({
        'recycle_bin': { x: 0, y: 0 },
        'about_me': { x: 0, y: 100 },
        'qualifications': { x: 0, y: 200 },
        'blog': { x: 0, y: 300 },
        'game': { x: 0, y: 400},
    });

    useEffect(() => {
        if (ref.current === null) return;

        const rect = ref.current?.getBoundingClientRect();

        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
        
        setTopleft({ top: rect.top, left: rect.left });
    }, [ref.current]);

    return (
        <div
            ref={ref}
            className={styles.iconGrid}
            onMouseDown={handleMouseDown}
            onContextMenu={showContextMenu([
                {
                    key: "arrange_icons",
                    icon: <div>?</div>,
                    title: "Auto arrange icons",
                    onClick: () => {},
                },
                {
                    key: "sort_name",
                    icon: <div>?</div>,
                    title: "Sort by name",
                    onClick: () => {},
                },
                {
                    key: "new_folder",
                    icon: <div>?</div>,
                    title: "New folder",
                    onClick: () => {},
                },
                {
                    key: "new_text_file",
                    icon: <div>?</div>,
                    title: "New text document",
                    onClick: () => {},
                },
            ])}
        >
            <WIcon
                icon="recycle_bin"
                name="Recycle Bin"
                position={iconPos['recycle_bin']}
                selected={selectedIcon == 'recycle_bin'}
                onOpen={() => openIcon({
                    id: 'recycle_bin',
                    title: "Recycle Bin",
                    icon: "recycle_bin",
                    type: 'recycle_bin',
                })}
                onMouseDown={evt => handleIconClick(evt, 'recycle_bin')}
                onDrop={pos => moveIcon('recycle_bin', pos)}
            />
            <WIcon
                icon="about_me"
                name="About Me"
                position={iconPos['about_me']}
                selected={selectedIcon == 'about_me'}
                onOpen={() => openIcon({
                    id: 'about_me',
                    title: "About Me",
                    icon: "about_me",
                    type: 'about_me',
                })}
                onMouseDown={evt => handleIconClick(evt, 'about_me')}
                onDrop={pos => moveIcon('about_me', pos)}
            />
            <WIcon
                icon="qualifications"
                name="Experience"
                position={iconPos['qualifications']}
                selected={selectedIcon == 'qualifications'}
                onOpen={() => openIcon({
                    id: 'qualifications',
                    title: "Experience",
                    icon: "qualifications",
                    type: 'qualifications',
                })}
                onMouseDown={evt => handleIconClick(evt, 'qualifications')}
                onDrop={pos => moveIcon('qualifications', pos)}
            />
            <WIcon
                icon="blog"
                name="My Blog"
                position={iconPos['blog']}
                selected={selectedIcon == 'blog'}
                onOpen={() => openIcon({
                    id: 'blog',
                    title: "My Blog",
                    icon: "blog",
                    type: 'blog',
                })}
                onMouseDown={evt => handleIconClick(evt, 'blog')}
                onDrop={pos => moveIcon('blog', pos)}
            />
            <WIcon
                icon="game"
                name="Game"
                position={iconPos['game']}
                selected={selectedIcon == 'game'}
                onOpen={() => openIcon({
                    id: 'game',
                    title: "Game",
                    icon: "game",
                    type: 'game',
                })}
                onMouseDown={evt => handleIconClick(evt, 'game')}
                onDrop={pos => moveIcon('game', pos)}
            />
        </div>
    );

    function handleIconClick (
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>, id: IconId
    ) {
        setSelectedIcon(id);
        evt.stopPropagation();
    }

    function handleMouseDown () {
        setSelectedIcon(null);
    }

    function moveIcon (id: IconId, pos: Vec2) {
        const xRel = clampNumber(pos.x - topleft.left, 0, (width - 100));
        const yRel = clampNumber(pos.y - topleft.top, 0, (height - 100));

        if (xRel < 0 || xRel > width || yRel < 0 || yRel > height) {
            return;
        }

        const xGrid = xRel - (xRel % 100);
        const yGrid = yRel - (yRel % 100);

        for (const pos of Object.values(iconPos)) {
            if (pos.x == xGrid && pos.y == yGrid) return;
        }

        setIconPos(prevState => ({
            ...prevState,
            [id]: { x: xGrid, y: yGrid },
        }));
    }

    function openIcon (window: PartialOsWindow) {
        ctx.openWindow(window);
    }
}

export default IconGrid;
