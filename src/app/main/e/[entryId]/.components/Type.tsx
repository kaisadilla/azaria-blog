import React from 'react';
import styles from "./type.module.scss";

export interface TypeProps {
    children: React.ReactNode;
}

function Type ({
    children,
}: TypeProps) {

    return (
        <span className={styles.type}>{children}</span>
    );
}

export default Type;
