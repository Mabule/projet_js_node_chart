interface selectionProps{
    change: () => void;
    config: any;
    tranche: number;
}

export default function Selection({ change, config, tranche }: selectionProps){
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