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

interface chartProps{
    labels: string[];
    donnees: any[];
    options: any;
}

//Composant React pour le graphique de ChartJs
export default function Chart({ labels, donnees, options }: chartProps){

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Nombre de décès',
                data: donnees,
                borderColor: '#4752C4',
                backgroundColor: '#5865F2',
                borderRadius: 7
            }
        ],
    };

    return <Bar options={options} data={data} />;
}