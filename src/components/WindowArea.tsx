'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './WindowArea.module.scss';
import DesktopWindow from './DesktopWindow';
import { clampNumber, Vec2 } from '@/utils';
import Draggable, { DraggableBounds } from 'react-draggable';
import { NumberSize, Resizable } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';
import { Rnd } from 'react-rnd';

export interface WindowAreaProps {
    
}

function WindowArea (props: WindowAreaProps) {
    const ref = useRef<HTMLDivElement>(null);
    const nref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [topleft, setTopleft] = useState({top: 0, left: 0});

    const [size, setSize] = useState({width: 400, height: 300});
    const [pos, setPos] = useState<Vec2>({x: 300, y: 200});

    const [clickPos, setClickPos] = useState<Vec2>({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const [boundaries, setBoundaries] = useState<DraggableBounds | undefined>(undefined);

    useEffect(() => {
        if (ref.current === null) return;

        const rect = ref.current?.getBoundingClientRect();

        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
        
        setTopleft({ top: rect.top, left: rect.left });

        //document.addEventListener('mousemove', handleMouseMove);

        //() => {
        //    document.removeEventListener('mousemove', handleMouseMove);
        //}
    }, [ref.current, dragging]);

    return (
        <div ref={ref} className={styles.windowArea}>
            <Draggable
                nodeRef={nref}
                handle=".windowHandle"
                bounds={boundaries}
                onMouseDown={recalculateBoundaries}
                position={pos}
                onStop={(evt, data) => setPos({x: data.x, y: data.y})}
            >
                <div ref={nref}>
                    <Rnd
                        disableDragging={true}
                        defaultSize={size}
                        minWidth={196}
                        minHeight={128}
                        maxWidth={width + 6}
                        maxHeight={height + 6}
                        style={{pointerEvents: 'auto'}}
                        onResizeStop={handleResizeStop}
                        size={size}
                    >
                        <DesktopWindow
                            position={pos}
                        />
                    </Rnd>
                </div>
            </Draggable>
        </div>
    );

    function recalculateBoundaries (evt: MouseEvent) {
        const rect = nref.current?.getBoundingClientRect();

        const xOffset = evt.clientX - (rect?.left ?? 0);
        const yOffset = evt.clientY - (rect?.top ?? 0);

        setBoundaries({
            left: -xOffset - 3,
            top: -yOffset - 3,
            right: width - xOffset,
            bottom: height - yOffset
        })
    }

    function handleResizeStop (
        evt: MouseEvent | TouchEvent,
        direction: Direction,
        elementRef: HTMLElement,
        delta: NumberSize
    ) {
        setSize({
            width: elementRef.offsetWidth,
            height: elementRef.offsetHeight,
        });
    }
}

export default WindowArea;
