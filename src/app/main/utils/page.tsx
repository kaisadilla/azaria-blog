import React from 'react';
import styles from "./page.module.scss";
import b2 from "../layout.module.scss";
import { MaterialSymbol } from 'react-material-symbols';
import Link from 'next/link';

export interface UtilsPageProps {
    
}

function UtilsPage (props: UtilsPageProps) {

    return (
        <div className={styles.body}>
            <div className={styles.utilList}>
                <a
                    className={styles.util}
                    target='_blank'
                    href="https://leaflys.azariadev.dev"
                >
                    <div className={styles.utilIcon}>
                        <MaterialSymbol icon='pin_drop' />
                    </div>
                    <div className={styles.utilTitle}>
                        <div className={styles.utilName}>
                            Leaflys GeoJSON editor
                        </div>
                        <MaterialSymbol icon='open_in_new' />
                    </div>
                    <div className={styles.utilDesc}>
                        A rich visual GeoJSON editor. Leaflys allows the user to
                        easily create and modify GeoJSON documents.
                    </div>
                </a>
            </div>
        </div>
    );
}

export default UtilsPage;
