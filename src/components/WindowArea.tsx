'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './WindowArea.module.scss';
import DesktopWindow from './DesktopWindow';
import { clampNumber, Vec2 } from '@/utils';
import Draggable, { DraggableBounds } from 'react-draggable';
import { NumberSize, Resizable } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';
import { Rnd } from 'react-rnd';
import MovableWindow from './MovableWindow';
import { useOsContext } from '@/app/main/context';
import RecycleBinApp from './RecycleBinApp';
import BlogApp from './BlogApp';

export interface WindowAreaProps {
    
}

function WindowArea (props: WindowAreaProps) {
    const ctx = useOsContext();

    const ref = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [topleft, setTopleft] = useState({top: 0, left: 0});
    const [indices, setIndices] = useState<{[windowId: string]: number}>({});

    useEffect(() => {
        if (ref.current === null) return;

        const rect = ref.current?.getBoundingClientRect();

        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
        
        setTopleft({ top: rect.top, left: rect.left });
    }, [ref.current]);

    useEffect(() => {
        setIndices(prevState => {
            const newState: {[windowId: string]: number} = {};
            const windowCount = Object.keys(prevState).length;

            for (const k in prevState) {
                if (ctx.activeWindowId === k) {
                    newState[k] = windowCount;
                }
                else {
                    newState[k] = clampNumber(prevState[k] - 1, 0, windowCount - 1);
                }
            }

            return newState;
        });
    }, [ctx.activeWindowId]);

    useEffect(() => {
        setIndices(prevState => {
            const newState: {[windowId: string]: number} = {};

            for (const w of ctx.windows) {
                if (ctx.activeWindowId === w.id) {
                    newState[w.id] = ctx.windows.length;
                }
                else {
                    newState[w.id] = prevState[w.id] ?? 0;
                }
            }

            return newState;
        })
    }, [ctx.windows.length]);

    return (
        <div ref={ref} className={styles.windowArea}>
            {ctx.windows.filter(w => w.minimized === false).map(w => <MovableWindow
                key={w.id}
                window={w}
                parentWidth={width}
                parentHeight={height}
                focused={ctx.activeWindowId === w.id}
                onFocus={() => ctx.setActiveWindow(w.id)}
                index={indices[w.id]}
            >
                {
                    w.type === 'recycle_bin' && <RecycleBinApp />
                }
                {
                    w.type === 'blog' && <BlogApp />
                }
            </MovableWindow>)}
        </div>
    );
}

export default WindowArea;
