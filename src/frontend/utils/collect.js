import axios from 'axios';

export default function collect(url){
    try{
        const response = axios({
            url: "http://localhost:8080/"+url,
            origin: 'http://localhost:3000/'
        });
        return response;
    }catch(e){
        console.log(e);
    }
};
