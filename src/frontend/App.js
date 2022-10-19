import './app.scss';
import Menu from "./components/menu/Menu";
import Router from "./components/router/Router";
import { useState } from 'react';

export default function App(){
    
    const [fenetre, setFenetre] =  useState('page1');
    const [urls, setUrls] = useState(["filterOn?file=deces-2022-t2.txt&filter=age"])

    return (
        <div id="body">
            <Menu setFenetre={setFenetre} setUrls={setUrls}/>
            <Router window={fenetre} urls={urls}/>
        </div>
    );
}