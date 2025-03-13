'use client';

import React from 'react';
import WIcon from './WIcon';
import Clock from './Clock';
import styles from "./Desktop.module.scss";
import IconGrid from './IconGrid';
import Megaplace from '@/app/megaplace/page';
import WindowArea from './WindowArea';
import TaskbarTabs from './TaskbarTabs';
import { OsContextProvider } from '@/app/main/context';

export interface DesktopProps {
    
}

function Desktop (props: DesktopProps) {

    return (
        <OsContextProvider>

        <div className={styles.desktop} style={{backgroundImage: `url("/img/wxp_bg.png")`}}>
            <div className={styles.content}>
                <div className={styles.areaContainer}>
                    <IconGrid />
                    <WindowArea />
                </div>
            </div>
            <div className={styles.taskbar} style={{backgroundImage: `url("/img/wxp_taskbar.png")`}}>
                <img
                    src="img/wxp_taskbar_start.png"
                    alt=""
                />
                <div className={styles.taskbarTabs}>
                    <TaskbarTabs />
                </div>
                <div className={styles.taskbarTime} style={{backgroundImage: `url("/img/wxp_taskbar_time.png")`}}>
                    <Clock />
                </div>
            </div>
        </div>

        </OsContextProvider>
    );
}

export default Desktop;
