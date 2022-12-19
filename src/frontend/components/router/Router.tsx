import { useQuery } from "@tanstack/react-query";

import Loading from '../others/Loading';
import Error from '../others/Error';

import collect from "../../utils/collect";
import Page from "../page/Page";

import './router.scss';

interface routerProps{
    url: string;
    id: string;
}

export default function Router({ url, id }: routerProps){

    const { data, status } = useQuery({
        queryKey: [url],
        queryFn: () => collect(url)
    });

    return (
        <div id="router">
            <div className="page">
                {
                    status == "loading" ?
                    <Loading />
                    :
                    status == "success" && data !== undefined ?
                    <Page data={data.data} id={id} />
                    :
                    status == "error" ?
                    <Error message="Une erreur est survenue lors de la requête. Veuillez réessayer" />
                    :
                    <Error />
                }
            </div>
        </div>
    );
}