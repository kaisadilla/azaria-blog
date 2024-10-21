'use client';

import { Vec2 } from '@/utils';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import styles from "./DesktopWindow.module.scss";

export interface DesktopWindowProps {
    position: Vec2;
    onDragStart?: (relativePosition: Vec2) => void;
    onDragEnd?: () => void;
    onMouseMove?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function DesktopWindow ({
    position,
    onDragStart,
    onDragEnd,
    onMouseMove,
}: DesktopWindowProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [dragging]);

    const divStyle = {
        top: position.y,
        left: position.x,
    };

    return (
        <div ref={ref} className={styles.window} style={divStyle} onMouseMove={onMouseMove}>
            <div className={styles.windowTop}>
                <img
                    className={`${styles.windowTopLeft} windowHandle`}
                    src="/img/window_frame_top_left.png"
                    alt=""
                    draggable={false}
                    onMouseDown={handleMouseDown}
                />
                <img
                    className={`${styles.windowTopCenter} windowHandle`}
                    src="/img/window_frame_top.png"
                    alt=""
                    draggable={false}
                    onMouseDown={handleMouseDown}
                />
                <img
                    className={styles.windowTopRight}
                    src="/img/window_frame_top_right.png"
                    alt=""
                    draggable={false}
                />
            </div>
            <div className={styles.windowLeft}>
                <img
                    src="/img/window_frame_left.png"
                    alt=""
                    draggable={false}
                />
            </div>
            <div className={styles.windowContent}>
                Content here
            </div>
            <div className={styles.windowRight}>
                <img
                    src="/img/window_frame_right.png"
                    alt=""
                    draggable={false}
                />
            </div>
            <div className={styles.windowBottom}>
                <img
                    className={styles.windowBottomLeft}
                    src="/img/window_frame_bottom_left.png"
                    alt=""
                    draggable={false}
                />
                <img
                    className={styles.windowBottomCenter}
                    src="/img/window_frame_bottom.png"
                    alt=""
                    draggable={false}
                />
                <img
                    className={styles.windowBottomRight}
                    src="/img/window_frame_bottom_right.png"
                    alt=""
                    draggable={false}
                />
            </div>
        </div>
    );

    function handleMouseDown (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setDragging(true);

        const rect = ref.current?.getBoundingClientRect();

        onDragStart?.({
            x: evt.clientX - (rect?.left ?? 0),
            y: evt.clientY - (rect?.top ?? 0)
        });
    }

    function handleMouseUp (evt: MouseEvent) {
        if (dragging === false) return;
        
        onDragEnd?.();
    }
}

export default DesktopWindow;
