import React from 'react';
import WIcon from './WIcon';
import Clock from './Clock';
import styles from "./Desktop.module.scss";
import IconGrid from './IconGrid';

export interface DesktopProps {
    
}

function Desktop (props: DesktopProps) {

    return (
        <div className={styles.desktop} style={{backgroundImage: `url("/img/wxp_bg.png")`}}>
            <div className={styles.content}>
                <IconGrid />
            </div>
            <div className={styles.taskbar} style={{backgroundImage: `url("/img/wxp_taskbar.png")`}}>
                <div className={styles.taskbarTabs}>
                    
                </div>
                <div className={styles.taskbarTime} style={{backgroundImage: `url("/img/wxp_taskbar_time.png")`}}>
                    <Clock />
                </div>
            </div>
        </div>
    );
}

export default Desktop;
