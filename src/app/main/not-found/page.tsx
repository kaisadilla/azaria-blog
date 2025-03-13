import React from 'react';
import styles from "./page.module.scss";

export interface MainNotFoundPageProps {
    
}

function MainNotFoundPage (props: MainNotFoundPageProps) {

    return (
        <div className={styles.body}>
            <div className={styles.error}>
                <div className={styles.code}>404</div>
                <div className={styles.message}>Not found</div>
            </div>
        </div>
    );
}

export default MainNotFoundPage;
