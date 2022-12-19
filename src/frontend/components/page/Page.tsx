import { useState } from "react";
import Chart from '../chart/Chart';
import Selection from "./Selection";
import collect from "../../utils/collect";
import config from "../../env.json";
import Error from "../others/Error";

interface pageProps{
    data: {tab: any[], labels: string[], status: number, options: any};
    id: string;
}

export default function Page({ data, id }: pageProps){

    const [tab, setTab] = useState(data.tab);
    const [labels, setLabels] = useState(data.labels);
    const [tra, setTra] = useState(10);
    const [loaded, setLoaded] = useState(true);
    
    var change = async (param = null) => {
        if(loaded){
            
            if(param !== null)
            //@ts-ignore
                document.querySelector('#select').value = param;
            //@ts-ignore
            const val: any = document.querySelector('#select').value;
            //@ts-ignore
            await collect("filterOn?file=deces-2022-t2.txt&filter=age&tranche="+val).then(res => {
                setTra(val)
                setTab(res.data.tab)
                setLabels(res.data.labels)
                setLoaded(true);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    if(data.status == 1){
        return(
            <>
            {
                id == "page1" ?
                <Selection key={"selection"} change={change} config={config} tranche={tra}/>
                :
                null
            }
            <div id="chart" key={"chart"}>
                <Chart donnees={tab} labels={labels} options={data.options}/>
            </div>
            </>
            
        );
    } else {
        return <Error message={"Un des paramètres de la requête a été modifié !"}/>
    }
}