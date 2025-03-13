import React from 'react';
import styles from "./aside.module.scss";

export interface AsideProps {
    children?: React.ReactNode;
}

function Aside ({
    children,
}: AsideProps) {

    return (
        <aside className={styles.aside}>
            {children}
        </aside>
    );
}

export default Aside;
