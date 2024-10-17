'use client';

import React, { useEffect, useState } from 'react';

export interface ClockProps {
    
}

function Clock (props: ClockProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const clock = setInterval(() => setTime(new Date()), 1000);

        return () => {
            clearInterval(clock);
        };
    }, []);

    return (
        <div suppressHydrationWarning>
            {time.toLocaleTimeString("en-GB", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })}
        </div>
    );
}

export default Clock;
