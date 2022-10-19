import { collect } from "./tools";
import { useEffect, useState } from "react";
import './main.scss';
// import Card from "./Card";
import Chart from "./Chart.tsx";

export default function App(){
    
    const [data, setData] = useState(null);
    const [tra, setTra] = useState(20);

    useEffect(() => {
        if(data === null){
            collect("get", "filterOn?file=deces-2022-t2.txt&filter=age").then((response) => {
                setData(response.data);
                console.log(response.data.message)
            })
        }
    }, [data]);

    function change(param = null){
        let val;
        if(param !== null){
            document.querySelector('#select').value = param;
            val = param;
        }else
            val = document.querySelector('#select').value;
        setTra(parseInt(val));
    }

    document.onkeydown = (e) => {
        let val = tra;
        if(e.keyCode === 38 && c.indexOf(tra) !== 0){
            val = c[c.indexOf(tra)-1];
        }else if(e.keyCode === 40 && c.indexOf(tra) !== c.length-1){
            val = c[c.indexOf(tra)+1];
        }
        if(val !== tra ){
            change(val);
        }
    }

    const c = [1, 2, 5, 10, 20, 25, 50, 75];

    return (
        <div id="body">
            {
                data !== null ?
                <div id="bar">
                    <div id="title">
                        Sélection de la tranche d'âge&ensp;
                        <select onChange={() => change()} id="select" value={tra}>
                        {
                            c.map((item, index) => {
                                return <option key={index} id={item} data-val={item} className="options">{item}</option>
                            })
                        }
                        </select>
                    </div>
                    <div id="chart">
                        <Chart tranche={tra} donnees={data.message} max={data.max}/>
                    </div>
                </div>
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
            }
        </div>
    );
}