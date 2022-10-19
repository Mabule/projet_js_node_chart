import './menu.scss'

export default function Menu(props){

    const options = ['trimestre 2 de 2022', 'Analyse des données de 2021aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'];

    function swape(index){
        let fenetre = "";
        let urls = [];
        switch (index){
            default:
                fenetre = 'page1';
                urls = ["filterOn?file=deces-2022-t2.txt&filter=age"];
            break;
        }
        props.setFenetre(fenetre);
        props.setUrls(urls);
    }

    return <div id="leftBar">
        <ul>
            {
                options.map((item, index) => {
                    return <li key={index} onClick={() => {swape(index)}}>{item}</li>
                })
            }
        </ul>
    </div>
}