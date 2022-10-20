import {useQueries} from '@tanstack/react-query'
import { collect } from "../../utils/tools";
import PageOne from "../pages/page_one/PageOne";
import './router.scss';

export default function Router(props){

    const queries = useQueries({
        queries: props.urls.map(url => {
            return {
                queryKey: ['url', url.id],
                queryFn: () => collect(url)
            }
        })
    })
    
    function getPage(window, data){
        switch (window){
            case'page1': 
                return <PageOne data={data}/>; 
            default:
                return null
        }
    }
    
    switch(queries[0].status){
        case 'loading':
            return <img 
                src="https://askcodez.com/images3/157446935584697.gif" 
                alt="loadging"
                style={{
                    width: "50px",
                    position: "absolute",
                    top: "calc(50% - 50px)",
                    left: "calc(50% - 50px)"
                }}/> 
        case 'success':
            const obj = getPage(props.window, queries[0].data.data);
            return <div id="router">{obj}</div>;
        case 'error':
            return <div>{queries.error}</div>
        default:
            return <div>Une erreur est survenue</div>
    }
}