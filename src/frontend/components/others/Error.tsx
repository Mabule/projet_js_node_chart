interface errorProps{
    message?: string;
}

//Composant React pour afficher un message d'erreur
export default function Error({ message = "" }: errorProps){
    return (
        <div>{message !== "" ? message : "Une erreur est survenue"}</div>
    );
}