import React, { useEffect } from 'react';
import styles from "./TaskbarTabs.module.scss";
import WindowsTab from './WindowsTab';
import { useOsContext } from '@/app/cmd/context';

export interface TaskbarTabsProps {
    
}

function TaskbarTabs (props: TaskbarTabsProps) {
    const ctx = useOsContext();

    return (
        <div className={styles.taskbarContainer}>
            {ctx.windows.map(w => <WindowsTab
                key={w.id}
                window={w}
                focused={ctx.activeWindowId === w.id}
            />)}
        </div>
    );
}

export default TaskbarTabs;
