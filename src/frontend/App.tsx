import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Menu from "./components/menu/Menu";
import Router from "./components/router/Router";
import './app.scss';

//Composant React principal correspondant à l'application dans sa globalité
export default function App(){
    
    const [url, setUrl] = useState("filterOn?file=deces-2022-t2.txt&filter=age&tranche=10");
    const [id, setId] = useState("page1");

    const queryClient = new QueryClient();

    return (
        <div id="body">
            <Menu setUrl={setUrl} setId={setId}/>
            <QueryClientProvider client={queryClient}>
                <Router url={url} id={id}/>
            </QueryClientProvider>
        </div>
    );
}