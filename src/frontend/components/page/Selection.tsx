interface selectionProps{
    change: () => void;
    config: any;
    tranche: number;
}

//Composant React correspondant au menu de selection de la tranche d'âge lors de l'affichage des morts par âge
export default function Selection({ change, config, tranche }: selectionProps){

    try{
        //@ts-ignore
        document.querySelector('#select').value = 10;
    }catch(e){ }

    return(
        <div id="title">
            Sélection de la tranche d'âge&ensp;
            <select onChange={() => change()} id="select" value={tranche}>
                {
                    config.slices.map((item: any, index: number) => {
                        return <option key={index} id={item} className="options">{item}</option>
                    })
                }
            </select>
        </div>
    );
}