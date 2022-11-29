import {useQueries} from '@tanstack/react-query'
import { collect } from "../../utils/tools";
import PageOne from "../pages/page_one/PageOne";
import PageTwo from "../pages/page_two/PageTwo";
import './router.scss';

export default function Router({ urls, window }){

    const queries = useQueries({
        queries: urls.map(url => {
            return {
                queryKey: ['url', url.id],
                queryFn: () => collect(url)
            }
        })
    })
    
    function getPage(window, data){
        switch (window){
            case 'page1':
                return <PageOne data={data}/>;
            case 'page2':
                return <PageTwo data={data}/>;
            default:
                return null
        }
    }
    
    switch(queries[0].status){
        case 'loading':
            return <img 
                src="https://askcodez.com/images3/157446935584697.gif" 
                alt="loading"
                style={{
                    width: "50px",
                    position: "absolute",
                    top: "calc(50% - 25px)",
                    left: "calc(50% - 25px)"
                }}/> 
        case 'success':
            const obj = getPage(window, queries[0].data.data);
            return <div id="router">{obj}</div>;
        case 'error':
            return <div>{queries.error}</div>
        default:
            return <div>Une erreur est survenue</div>
    }
}