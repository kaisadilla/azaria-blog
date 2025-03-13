import { redirect } from 'next/navigation';
import React from 'react';

export interface EntryPointProps {
    
}

function MainPage (props: EntryPointProps) {
    redirect('/main');

    return (
        <div>
            entry
        </div>
    );
}

export default MainPage;
