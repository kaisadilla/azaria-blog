import React from 'react';
import styles from "./WindowsTab.module.scss";
import { getClassString } from '@/utils';
import { OsWindow } from '@/logic/OsWindow';
import { useOsContext } from '@/app/main/context';

export interface WindowsTabProps {
    window: OsWindow;
    focused?: boolean;
    onFocus?: () => void;
}

function WindowsTab ({
    window,
    focused = false,
    onFocus,
}: WindowsTabProps) {
    const ctx = useOsContext();

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
            onClick={handleClick}
        >
            <img
                className={styles.icon}
                src={`img/w_icon/${window.icon}_16.png`}
            />
            <div className={styles.title}>{window.title}</div>
        </div>
    );

    function handleClick () {
        ctx.setActiveWindow(window.id);
        if (window.minimized) {
            const update = { ...window };
            update.minimized = false;
            ctx.updateWindow(update);
        }
    }
}

export default WindowsTab;
