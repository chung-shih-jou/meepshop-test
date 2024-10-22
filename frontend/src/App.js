import './App.css';
import MenuProvider from 'provider/Menu';
import Loading from 'components/Loading';
import { Suspense } from 'react';
import MainLayout from 'Layout/main';

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <MenuProvider>
                <MainLayout></MainLayout>
            </MenuProvider>
        </Suspense>
    );
}

export default App;
