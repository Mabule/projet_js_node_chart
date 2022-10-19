import axios from 'axios';

const collect = (method, url) => {
    try{
        const response = axios({
            method: method,
            url: "http://localhost:8080/"+url,
            origin: 'http://localhost:3000/'
        });
        return response;
    }catch(e){
        console.log(e);
    }
}

export { collect };