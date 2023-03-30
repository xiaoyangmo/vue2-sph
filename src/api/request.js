import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

const requests=axios.create({
   baseURL:"/api",
    timeout:5000
});
requests.interceptors.request.use((config) => {
    nprogress.start();
    if(localStorage.getItem('uuid_token')){
        config.headers.userTempId=localStorage.getItem('uuid_token')
    }
    if(localStorage.getItem('token')){
        config.headers.TOKEN=localStorage.getItem('token')
    }
    return config
})
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
})

export default requests