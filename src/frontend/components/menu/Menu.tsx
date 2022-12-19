import './menu.scss';
import config from "../../env.json";

interface menuProps{
    setUrl: any;
    setId: any;
}

export default function Menu({ setUrl, setId }: menuProps){

    function swape(name: string){
        config.windows.forEach(window => {
            if(window.componentName === name){
                setUrl(window.url);
                setId(window.componentName);
            }
        })
    }

    return (
        <div id="leftBar">
            <ul>
                {
                    config.windows.map((item: {componentName: string, title: string}, index: number) => {
                        return <li key={index} onClick={() => {swape(item.componentName)}}>{item.title}</li>
                    })
                }
            </ul>
        </div>
    );
}