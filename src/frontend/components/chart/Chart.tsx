import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart(props){

    const options = {
        indexAxis: 'x' as const,
        elements: {
            bar: {
                borderWidth: 3
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                display: true
            }
        }
    };

    let data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Nombre de décès',
                data: props.donnees,
                borderColor: '#4752C4',
                backgroundColor: '#5865F2',
                borderRadius: 7
            }
        ],
    };

    return <Bar options={options} data={data} />;
}