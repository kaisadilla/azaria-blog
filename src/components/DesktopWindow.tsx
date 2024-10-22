'use client';

import { getClassString, Vec2 } from '@/utils';
import React, { ReactNode, useEffect, useReducer, useRef, useState } from 'react';
import styles from "./DesktopWindow.module.scss";
import { OsWindow } from '@/logic/OsWindow';
import { useOsContext } from '@/app/context';

export interface DesktopWindowProps {
    window: OsWindow;
    focused?: boolean;
    onFocus?: () => void;
    children?: ReactNode;
}

function DesktopWindow ({
    window,
    focused = false,
    onFocus,
    children,
}: DesktopWindowProps) {
    const ctx = useOsContext();

    const divStyle = {
        top: window.position.y,
        left: window.position.x,
    };

    const frameName = focused ? "window_frame" : "window_frame_inactive"

    return (
        <div className={styles.window} style={divStyle} onMouseDown={() => onFocus?.()}>
            <div className={styles.windowTop}>
                <img
                    className={`${styles.windowTopLeft} windowHandle`}
                    src={`/img/${frameName}_top_left.png`}
                    alt=""
                    draggable={false}
                />
                <img
                    className={`${styles.windowTopCenter} windowHandle`}
                    src={`/img/${frameName}_top.png`}
                    alt=""
                    draggable={false}
                />
                <img
                    className={styles.windowTopRight}
                    src={`/img/${frameName}_top_right.png`}
                    alt=""
                    draggable={false}
                />
                <div className={styles.windowHandle}>
                    <div className={styles.identity}>
                        <div className={styles.icon}>
                            <img
                                className={styles.icon}
                                src={`img/w_icon/${window.icon}_16.png`}
                            />
                        </div>
                        <div className={styles.title}>
                            {window.title}
                        </div>
                    </div>
                    <div className={styles.windowControls}>
                        <img
                            className={styles.control}
                            src={`img/${frameName}_minimize.png`}
                            alt=""
                        />
                        <img
                            className={styles.control}
                            src={`img/${frameName}_maximize.png`}
                            alt=""
                        />
                        <img
                            className={styles.control}
                            src={`img/${frameName}_close.png`}
                            alt=""
                            onClick={() => handleClose(window)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.windowLeft}>
                <img
                    src={`/img/${frameName}_left.png`}
                    alt=""
                    draggable={false}
                />
            </div>
            <div className={styles.windowContent}>
                {children}
            </div>
            <div className={styles.windowRight}>
                <img
                    src={`/img/${frameName}_right.png`}
                    alt=""
                    draggable={false}
                />
            </div>
            <div className={styles.windowBottom}>
                <img
                    className={styles.windowBottomLeft}
                    src={`/img/${frameName}_bottom_left.png`}
                    alt=""
                    draggable={false}
                />
                <img
                    className={styles.windowBottomCenter}
                    src={`/img/${frameName}_bottom.png`}
                    alt=""
                    draggable={false}
                />
                <img
                    className={styles.windowBottomRight}
                    src={`/img/${frameName}_bottom_right.png`}
                    alt=""
                    draggable={false}
                />
            </div>
        </div>
    );

    function handleClose (window: OsWindow) {
        ctx.closeWindow(window.id);
    }
}

export default DesktopWindow;
