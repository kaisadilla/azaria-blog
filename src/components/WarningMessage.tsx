import React from 'react';
import styles from "./WarningMessage.module.scss"

export interface WarningMessageProps {
    title: string;
    message: string;
}

function WarningMessage ({
    title,
    message,
}: WarningMessageProps) {

    return (
        <div className={styles.warningMessage}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.message}>
                {message}
            </div>
        </div>
    );
}

export default WarningMessage;
