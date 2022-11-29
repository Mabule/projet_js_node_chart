import Chart from "../../chart/Chart.tsx";

export default function PageTwo({ data }){

    return (
        <div class="page">
            <div id="chart">
                <Chart donnees={tab} labels={labels} max={data.max}/>
            </div>
        </div>
    );
}