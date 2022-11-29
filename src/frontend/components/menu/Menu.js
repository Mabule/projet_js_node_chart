import './menu.scss';
import datas from "../../env.json";

export default function Menu({ setFenetre, setUrls }){

    console.log()

    const options = ['trimestre 2 de 2022', 'Analyse des données de 2021aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'];

    function swape(index){
        let fenetre = "";
        let urls = [];
        switch (index.toString()){
            case "0":
                fenetre = 'page1';
                urls = ["filterOn?file=deces-2022-t2.txt&filter=age&tranche=10"];
                break;
            default:
                fenetre = 'page1';
                urls = ["filterOn?file=deces-2022-t2.txt&filter=age&tranche=10"];
            break;
        }
        setFenetre(fenetre);
        setUrls(urls);
    }

    return <div id="leftBar">
        <ul>
            {
                datas["windows"].map((item, index) => {
                    return <li key={index} onClick={() => {swape(index)}}>{item.title}</li>
                })
            }
        </ul>
    </div>
}