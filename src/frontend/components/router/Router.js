import { useEffect, useState } from "react";
import { collect } from "../../utils/tools";
import PageOne from "../pages/page_one/PageOne";
import './router.scss';

export default function Router(props){
    
    const [datas, setDatas] = useState([])

    const collection = {
        'page1': <PageOne data={datas}/>
    }; 

    useEffect(() => {
        for(let url in props.urls){
            collect("get", props.urls[url]).then((response) => {
                let tmp = [...datas];
                tmp.push(response.data);
                setDatas(tmp);
            })
        }
    }, []);

    return (
        datas.length > 0 ?
        <div id="router">{collection[props.window]}</div>
        :
        <img 
            src="https://askcodez.com/images3/157446935584697.gif" 
            alt="loadging"
            style={{
                width: "50px",
                position: "absolute",
                top: "calc(50% - 50px)",
                left: "calc(50% - 50px)"
            }}/>
    );
}