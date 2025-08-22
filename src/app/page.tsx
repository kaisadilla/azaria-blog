import { redirect } from 'next/navigation';

export interface EntryPointProps {
    
}

function MainPage (props: EntryPointProps) {
    redirect('/portfolio');

    return (
        <div>
        </div>
    );
}

export default MainPage;
