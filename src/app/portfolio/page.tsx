'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import AzariaSvg from '@/assets/AzariaSvg';
import { $cl } from '@/utils';
import { Typewriter } from 'react-simple-typewriter';

enum PageState {
    LogoStart,
    LogoEnd,
    LogoRemove,
};

export interface PortfolioPageProps {

}

function PortfolioPage (props: PortfolioPageProps) {
    const [state, setState] = useState<PageState>(PageState.LogoStart);

    useEffect(() => {
        function handleKeyPress () {
            if (state >= PageState.LogoRemove) return;

            setState(PageState.LogoRemove);
        }
        
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('touchend', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('touchend', handleKeyPress);
        }
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.landing}>
                <AzariaSvg className={$cl(
                    styles.azaria,
                    state >= PageState.LogoRemove && styles.remove
                )} />
                <div className={styles.startMessage}>
                    Press any key to continue.
                </div>
            </div>
        </div>
    );
}

export default PortfolioPage;
