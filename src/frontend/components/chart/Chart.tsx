import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    // PointElement,
    // LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    // PointElement,
    // LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart({ labels, donnees }){

    const options = {
        type: 'bar',
        indexAxis: 'x' as const,
        elements: {
            // line: {
            //     borderWidth: 3,
            //     fill: true
            // },
            bar: {
                borderWidth: 3,
                fill: true
            },
        },
        responsive: true,
        stacked: false,
        plugins: {
            title: {
                text: "titre",
                display: true
            },
            legend: {
                position: 'bottom' as const,
                display: true
            }
        }
    };

    const data = {
        labels: labels,//["1", "2", "3", "4", "5"],
        datasets: [
            // {
            //     type: 'line',
            //     label: 'dataset 1',
            //     data: [1, 3, 6, 8, 0],
            //     // lineTension: 0.4,
            //     fill: true,
            //     borderColor: "#8e5ea2",
            //     backgroundColor: "rgba(142,94,162,0.63)",
            // },
            // {
            //     type: 'line',
            //     label: 'dataset 2',
            //     data: [3, 5, 6, 9, 3],
            //     // lineTension: 0,
            //     borderColor: "#c45850",
            //     backgroundColor: "rgba(196,88,80,0.63)",
            //     fill: true,
            // },
            // {
            //     type: 'line',
            //     label: 'dataset 3',
            //     data: [1, 2, 4, 6, 0],
            //     // lineTension: 0.4,
            //     borderColor: "#3cba9f",
            //     backgroundColor: "rgba(60,186,159,0.63)",
            //     fill: true
            // }
            {
                label: 'Nombre de décès',
                data: donnees,
                borderColor: '#4752C4',
                backgroundColor: '#5865F2',
                borderRadius: 7
            }
        ],
    };

    // @ts-ignore
    return <Bar options={options} data={data} />;//<Line options={options} data={data} />;
}