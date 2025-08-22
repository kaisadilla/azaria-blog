import React from 'react';
import styles from './NoProjectShowcase.module.scss';

export interface NoProjectShowcaseProps {
    
}

function NoProjectShowcase (props: NoProjectShowcaseProps) {

    return (
        <div className={styles.viewport}>
            <div className={styles.v2}>
                <div className={styles.offline}>
                    <div>OFFLINE</div>
                    <div>OFFLINE</div>
                    <div>OFFLINE</div>
                    <div>OFFLINE</div>
                </div>
            </div>
        </div>
    );
}

export default NoProjectShowcase;
