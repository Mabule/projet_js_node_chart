import { useState } from "react";
import Chart from '../../chart/Chart.tsx';
import './page_one.scss';

export default function PageOne(props){

    const [tra, setTra] = useState(20);

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
                <Chart tranche={tra} donnees={props.data[0].message} max={props.data[0].max}/>
            </div>
        </div>
    )
}