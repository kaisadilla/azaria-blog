import React from 'react';
import styles from "./AzariaLogo.module.scss";

export interface AzariaLogoProps {
    
}

function AzariaLogo (props: AzariaLogoProps) {

    return (
        <h1 className={styles.logo}>
            <span>Azaria</span>
            <span className={styles.logoHighlight}>(dev)<sup>2</sup></span>
        </h1>
    );
}

export default AzariaLogo;
