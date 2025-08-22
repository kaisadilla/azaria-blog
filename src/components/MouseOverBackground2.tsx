'use client';

import React, { useEffect, useState } from 'react';
import styles from "./MouseOverBackground2.module.scss"

export interface MouseOverBackground2Props {
    
}

function MouseOverBackground2 (props: MouseOverBackground2Props) {
    const [cursorPos, setCursorPos] = useState({x: 0, y: 0});
    const radius = 1;

    useEffect(() => {
        function handleMouseMove (evt: MouseEvent) {
            setCursorPos({x: evt.clientX, y: evt.clientY});
        }

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const maskImage = `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 0, 0, 1) ${radius}rem, rgba(0, 0, 0, 0) ${radius * 12}rem)`

    return (
        <div className={styles.area} style={{maskImage: maskImage}}>
            <div className={styles.bg} />
        </div>
    );
}

export default MouseOverBackground2;
