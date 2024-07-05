import { APP, ENDPOINTS } from "../config/environment";
import { Role, User } from "../models";
import axios from "axios";

export const logIn = async (username:string, password:string):Promise<any> => {
    return axios.post(ENDPOINTS.BASE_URL+'/users/login', {username, password}).then( result => {
        if(result.data){
            storeUser({
                ...result.data.user,
                role_name: result.data.role_name
            });
            storeToken(result.data.access_token);
            return result.data.access_token;
        }
    });
};

export const signUp = async (user:User):Promise<string> => {
    return axios.post(ENDPOINTS.BASE_URL+'/users', user).then( result => result.data);
};

export const getRoles = async ():Promise<Role[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/users/roles').then( result => result.data);
};

const storeUser = (user:User)=>{
    localStorage.setItem(APP.ID+'.user', JSON.stringify(user));
}

const storeToken = (token:string)=>{
    localStorage.setItem(APP.ID+'.token', token);
}


export const getUser = ():User|null=>{
    return JSON.parse(localStorage.getItem(APP.ID+'.user') || '{}');
}

export const getToken = ()=>{
    return localStorage.getItem(APP.ID+'.token');
}

export const removeToken = ()=>{
    return localStorage.removeItem(APP.ID+'.token');
}