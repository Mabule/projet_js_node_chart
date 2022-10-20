import './app.scss';
import Menu from "./components/menu/Menu";
import Router from "./components/router/Router";
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App(){
    
    const [fenetre, setFenetre] =  useState('page1');
    const [urls, setUrls] = useState(["filterOn?file=deces-2022-t2.txt&filter=age&tranche=10"]);

    const queryClient = new QueryClient();

    return (
        <div id="body">
            <Menu setFenetre={setFenetre} setUrls={setUrls}/>
            <QueryClientProvider client={queryClient}>
                <Router window={fenetre} urls={urls}/>
            </QueryClientProvider>
        </div>
    );
}