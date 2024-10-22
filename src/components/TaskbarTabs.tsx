import React, { useEffect } from 'react';
import styles from "./TaskbarTabs.module.scss";
import WindowsTab from './WindowsTab';
import { useOsContext } from '@/app/context';

export interface TaskbarTabsProps {
    
}

function TaskbarTabs (props: TaskbarTabsProps) {
    const ctx = useOsContext();

    return (
        <div className={styles.taskbarContainer}>
            {ctx.windows.map(w => <WindowsTab
                key={w.id}
                title={w.title}
                icon={w.icon}
                focused={ctx.activeWindowId === w.id}
                onFocus={() => ctx.setActiveWindow(w.id)}
            />)}
        </div>
    );
}

export default TaskbarTabs;
