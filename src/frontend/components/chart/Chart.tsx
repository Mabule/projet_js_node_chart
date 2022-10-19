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

function treatment(tab, maxx, tranche){
    let res = [], labels = [];
    let nb_colonne = Math.ceil(maxx/tranche);
    let min = 0, top = tranche-1, count = 0;
    labels.push(s(min, top));
    let tmp_tab = [];
    if(tranche === 1)
        tmp_tab = tab.filter(el => (el.age === min));
    else
        tmp_tab = tab.filter(el => (el.age >= min && el.age < top));
    tmp_tab.forEach(el => {
        count += el.nb;
    });
    res.push(count);
    for(let i = 1; i < nb_colonne; i++) {
        min = i*tranche;
        top = min+tranche-1;
        labels.push(s(min, top));
        if(tranche === 1)
            tmp_tab = tab.filter(el => (el.age === min));
        else
            tmp_tab = tab.filter(el => ((el.age >= min && el.age < top) || (i === nb_colonne-1 && el.age >= min)));
        count = 0;
        tmp_tab.forEach(el => {
            count += el.nb;
        });
        res.push(count);
    }
    return [res, labels];
}

const s = (min, maxx) => {
    return min.toString()+" – "+maxx.toString()+" ans";
}

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

    const [tab, labels] = treatment(props.donnees, props.max, props.tranche);

    let data = {
        labels,
        datasets: [
            {
                label: 'Nombre de décès',
                data: tab,
                borderColor: '#4752C4',
                backgroundColor: '#5865F2',
                borderRadius: 7
            }
        ],
    };

    return <Bar options={options} data={data} />;
}