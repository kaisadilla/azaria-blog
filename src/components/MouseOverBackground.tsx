'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from "./MouseOverBackground.module.scss";
import { $cl } from '@/utils';
import { DivProps } from '@/props_types';

export interface MouseOverBackgroundProps extends DivProps {
    blurRadius?: number;
    radius?: number;
    visible?: boolean;
    zIndex?: number;
    className?: string;
}

function MouseOverBackground ({
    blurRadius = 12,
    radius = 1,
    visible = true,
    zIndex = -1,
    className,
    ...divProps
}: MouseOverBackgroundProps) {
    const ref = useRef<HTMLDivElement>(null);

    const start = -1_000_000;

    const [mask, setMask] = useState(getMask(start, start, radius, blurRadius));

    useEffect(() => {
        const handleMouseMove = (evt: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            setMask(getMask(
                evt.clientX - rect.x, evt.clientY - rect.y, radius, blurRadius
            ));
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const style: React.CSSProperties = {
        ...divProps.style,
        zIndex: zIndex,
        maskImage: mask,
        visibility: visible ? 'visible' : 'hidden',
    };

    return (
        <div
            ref={ref}
            className={$cl(className, styles.area)}
            style={style}
            {...divProps}
        >
            
        </div>
    );
}

function getMask (x: number, y: number, radius: number, blur: number) : string {
    return `radial-gradient(` +
        `circle at ${x}px ${y}px,` +
        `#000000FF ${radius}rem,` +
        `#00000000 ${radius * blur}rem` +
    `)`;
}

export default MouseOverBackground;
