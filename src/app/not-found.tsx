import { redirect } from 'next/navigation';
import React from 'react';

export interface AppNotFoundPageProps {
    
}

function AppNotFoundPage (props: AppNotFoundPageProps) {
    redirect('/main/not-found');

    return (
        <div>
            404
        </div>
    );
}

export default AppNotFoundPage;
