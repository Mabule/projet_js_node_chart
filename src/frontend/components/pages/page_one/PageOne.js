import { useState } from "react";
import Chart from '../../chart/Chart.tsx';
import './page_one.scss';
import {useQuery} from '@tanstack/react-query';
import { collect } from "../../../utils/tools";

export default function PageOne(props){

    const [tra, setTra] = useState(10);
    const [tab, setTab] = useState(props.data.executed[0]);
    const [labels, setLabels] = useState(props.data.executed[1]);

    async function change(param = null){
        if(param !== null)
            document.querySelector('#select').value = param;
        const val = document.querySelector('#select').value;
        await collect("filterOn?file=deces-2022-t2.txt&filter=age&tranche="+val).then(res => {
            setTra(val)
            setTab(res.data.executed[0])
            setLabels(res.data.executed[1])
        }).catch(err => {
            console.log(err);
        });
    }

    window.addEventListener('load', () => {
        document.querySelector('#bar').addEventListener('mouseenter', () => {
            document.onkeydown = e => {
                console.log(e)
                let val = tra;
                if(e.code === 'ArrowDown' && c.indexOf(tra) !== 0){
                    val = c[c.indexOf(tra)-1];
                }else if(e.code === 'ArrowUp' && c.indexOf(tra) !== c.length-1){
                    val = c[c.indexOf(tra)+1];
                }
                console.log(tra)
                if(val !== tra ){
                    change(val);
                }
            }
        });
    });

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
                <Chart tranche={tra} donnees={tab} labels={labels} max={props.data.max}/>
            </div>
        </div>
    )
}