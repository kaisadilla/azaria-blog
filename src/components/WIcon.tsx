'use client';

import React, { useEffect, useState } from 'react';
import styles from "@/components/WIcon.module.scss";
import Image from 'next/image';
import { getClassString, Vec2 } from '@/utils';

export interface WIconProps {
    icon: string;
    name: string;
    position: { x: number, y: number };
    selected?: boolean;
    onMouseDown?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onDrop?: (position: Vec2) => void;
}

function WIcon ({
    icon,
    name,
    position,
    selected,
    onMouseDown,
    onDrop,
}: WIconProps) {
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [dragging]);

    const classStr = getClassString(
        styles.icon,
        selected && styles.selected
    );

    const divStyle = {
        top: position.y,
        left: position.x
    };

    return (
        <div
            className={classStr}
            style={divStyle}
            onMouseDown={handleMouseDown}
        >
            <Image
                src={`/img/w_icon/${icon}.png`}
                alt=""
                width={48}
                height={48}
                draggable={false}
            />
            <div className={styles.fileName}>{name}</div>
        </div>
    );

    function handleMouseDown (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setDragging(true);
        onMouseDown?.(evt);
    }

    function handleMouseUp (evt: MouseEvent) {
        if (dragging === false) return;

        setDragging(false);
        onDrop?.({ x: evt.pageX, y: evt.pageY });
    }
}

export default WIcon;
