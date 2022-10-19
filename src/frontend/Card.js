import './card_styles.scss';

export default function Card(props){
    const item = props.data;
    return (<div className='card'>
        <h3>{item.nom} {item.prenom}</h3>
        <p>Sexe: {item.sexe}</p>
        <p>Date de naissance: {item['date de naissance']}</p>
        <p>Code lieu de naissance: {item['code lieu de naissance']}</p>
        <p>Ville: {item.ville}</p>
        <p>Pays: {item.pays}</p>
        <p>Date de décès: {item['date de décès']}</p>
        <p>Code lieu de décès: {item['code lieu de décès']}</p>
    </div>
    );
}