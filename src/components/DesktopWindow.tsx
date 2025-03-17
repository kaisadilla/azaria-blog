'use client';

import { $cl, Vec2 } from '@/utils';
import React, { ReactNode, useEffect, useReducer, useRef, useState } from 'react';
import styles from "./DesktopWindow.module.scss";
import { OsWindow } from '@/logic/OsWindow';
import { useOsContext } from '@/app/cmd/context';

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

    // inactive border is HSL +5 / -25 / +42.
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
                        <img
                            className={styles.icon}
                            src={`img/w_icon/${window.icon}_16.png`}
                        />
                        <div className={styles.title}>
                            {window.title}
                        </div>
                    </div>
                    <div className={styles.windowControls}>
                        <img
                            className={styles.control}
                            src={`img/${frameName}_minimize.png`}
                            alt=""
                            onClick={handleMinimize}
                            draggable={false}
                        />
                        <img
                            className={styles.control}
                            src={
                                window.maximized
                                    ? `img/${frameName}_restore.png`
                                    : `img/${frameName}_maximize.png`
                            }
                            alt=""
                            onClick={handleMaximize}
                            draggable={false}
                        />
                        <img
                            className={styles.control}
                            src={`img/${frameName}_close.png`}
                            alt=""
                            onClick={handleClose}
                            draggable={false}
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

    function handleMinimize () {
        const update = { ...window };
        update.minimized = true;

        ctx.updateWindow(update);
        focusAnotherWindow([window.id]);
    }

    function handleMaximize () {
        const update = { ...window };
        update.maximized = !update.maximized;

        ctx.updateWindow(update);
    }

    function handleClose () {
        ctx.closeWindow(window.id);
        focusAnotherWindow([window.id]);
    }

    function focusAnotherWindow (excludedIds: string[]) {
        const maximizedWindows = ctx.windows.filter(
            w => excludedIds.includes(w.id) === false && w.minimized === false
        );

        if (maximizedWindows.length > 0) {
            ctx.setActiveWindow(maximizedWindows[0].id);
        }
        else {
            ctx.setActiveWindow(null);
        }
    }
}

export default DesktopWindow;
