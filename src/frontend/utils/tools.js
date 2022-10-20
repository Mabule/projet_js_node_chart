import axios from 'axios';

const collect = (url) => {
    try{
        const response = axios({
            url: "http://localhost:8080/"+url,
            origin: 'http://localhost:3000/'
        });
        return response;
    }catch(e){
        console.log(e);
    }
}

export { collect };