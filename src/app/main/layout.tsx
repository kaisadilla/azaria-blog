import React from 'react';
import { fontVariables } from '../fonts/fonts';

function MainLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={fontVariables()}>
            {children}
        </div>
    );
}

export default MainLayout;
