import './menu.scss'

export default function Menu(){

    const options = ['trimestre 2 de 2022', 'Analyse des données de 2021aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'];

    return <div id="leftBar">
        <ul>
            {
                options.map((item, index) => {
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
}