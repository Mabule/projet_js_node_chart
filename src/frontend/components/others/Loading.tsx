//Composant React pour afficher un gif pendant le chargement des données lors de la lecture d'un fichier
export default function Loading() {
    return (
        <img 
        src="https://askcodez.com/images3/157446935584697.gif" 
        alt="loading"
        style={{
            width: "50px",
            position: "absolute",
            top: "calc(50% - 25px)",
            left: "calc(50% - 25px)"
        }}/>
    );
}
