'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableBounds, DraggableEvent } from 'react-draggable';
import { DraggableData, Rnd } from 'react-rnd';
import DesktopWindow, { DesktopWindowProps } from './DesktopWindow';
import { getClassString, Vec2 } from '@/utils';
import { NumberSize } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';
import styles from "./MovableWindow.module.scss";
import { OsWindow } from '@/logic/OsWindow';
import { useOsContext } from '@/app/context';

export interface MovableWindowProps extends DesktopWindowProps {
    parentWidth: number;
    parentHeight: number;
    index?: number;
    children?: ReactNode;
}

function MovableWindow ({
    parentWidth,
    parentHeight,
    index = 0,
    children,
    window,
    focused,
    ...desktopWindowProps
}: MovableWindowProps) {
    const ctx = useOsContext();
    const ref = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState({width: 400, height: 300});

    const [boundaries, setBoundaries] = useState<DraggableBounds | undefined>(undefined);

    useEffect(() => {
        if (window.position.x > parentWidth || window.position.y > parentHeight) {
            updateWindowField('position', { x: 0, y: 0});
        }
    }, []);

    const divClass = getClassString(
        styles.movableWindow,
        focused && styles.focused,
    );

    const windowSize = window.maximized
        ? { width: parentWidth + 6, height: parentHeight + 6 }
        : size;

    return (
        <Draggable
            nodeRef={ref}
            handle=".windowHandle"
            bounds={boundaries}
            onMouseDown={recalculateBoundaries}
            position={window.maximized ? { x: -3, y: -3 } : window.position}
            onDrag={handleDrag}
            onStop={handleDragStop}
        >
            <div className={divClass} ref={ref} style={{zIndex: index}}>
                <Rnd
                    disableDragging={true}
                    defaultSize={size}
                    minWidth={196}
                    minHeight={128}
                    maxWidth={parentWidth + 6}
                    maxHeight={parentHeight + 6}
                    style={{pointerEvents: 'auto'}}
                    onResizeStop={handleResizeStop}
                    size={windowSize}
                >
                    <DesktopWindow
                        focused={focused}
                        window={window}
                        {...desktopWindowProps}
                    >
                        {children}
                    </DesktopWindow>
                </Rnd>
            </div>
        </Draggable>
    );

    function handleDrag (evt: DraggableEvent, data: DraggableData) {
        if (window.maximized == false) return;
        
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        // evt is actually a MouseEvent and not a Draggable event, for some reason.
        const mEvt = evt as MouseEvent;

        const update = {...window};
        update.maximized = false;
        update.position = { x: mEvt.clientX - rect.left - 100, y: mEvt.clientY - rect.top - 15};
        ctx.updateWindow(update);
    }

    function handleDragStop (evt: DraggableEvent, data: DraggableData) {
        updateWindowField('position', {x: data.x, y: data.y});
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

    function recalculateBoundaries (evt: MouseEvent) {
        if (window.maximized) return;

        const rect = ref.current?.getBoundingClientRect();

        const xOffset = evt.clientX - (rect?.left ?? 0);
        const yOffset = evt.clientY - (rect?.top ?? 0);

        setBoundaries({
            left: -xOffset - 3,
            top: -yOffset - 3,
            right: parentWidth - xOffset,
            bottom: parentHeight - yOffset
        })
    }

    function updateWindowField<K extends keyof OsWindow> (
        key: K, value: OsWindow[K],
    ) {
        const update: OsWindow = {...window};
        update[key] = value;

        ctx.updateWindow(update);
    }
}

export default MovableWindow;
