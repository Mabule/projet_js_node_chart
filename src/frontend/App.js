import './app.scss';
import Menu from "./components/menu/Menu";
import Router from "./components/router/Router";

export default function App(){

    return (
        <div id="body">
            <Menu/>
            <Router window={'page1'} urls={["filterOn?file=deces-2022-t2.txt&filter=age"]}/>
        </div>
    );
}