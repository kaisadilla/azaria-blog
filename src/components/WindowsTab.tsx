import React from 'react';
import styles from "./WindowsTab.module.scss";
import { getClassString } from '@/utils';

export interface WindowsTabProps {
    title: string;
    icon: string;
    focused?: boolean;
    onFocus?: () => void;
}

function WindowsTab ({
    title,
    icon,
    focused = false,
    onFocus,
}: WindowsTabProps) {
    const imgName = focused ? "active" : "inactive"

    const classStr = getClassString(
        styles.tab,
        focused && styles.focused,
    );

    return (
        <div
            className={classStr}
            style={{
                backgroundImage: `url("img/wxp_taskbar_tab_${imgName}.png")`
            }}
            onClick={() => onFocus?.()}
        >
            <img
                className={styles.icon}
                src={`img/w_icon/${icon}_16.png`}
            />
            <div className={styles.title}>{title}</div>
        </div>
    );
}

export default WindowsTab;
