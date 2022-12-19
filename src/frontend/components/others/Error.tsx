interface errorProps{
    message?: string;
}

export default function Error({ message = "" }: errorProps){
    return (
        <div>{message !== "" ? message : "Une erreur est survenue"}</div>
    );
}