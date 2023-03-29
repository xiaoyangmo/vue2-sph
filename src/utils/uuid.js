import {v4 as uuid} from 'uuid';
export const getUuid=()=>{
    let uuid_token=localStorage.getItem('uuid_token');
    if (!uuid_token){
        localStorage.setItem('uuid_token',uuid())
    }
    return uuid_token
}