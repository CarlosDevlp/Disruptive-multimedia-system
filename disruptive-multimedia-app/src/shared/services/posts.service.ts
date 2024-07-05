import { ENDPOINTS } from "../config/environment";
import { Post } from "../models";
import axios from "axios";

export const getPosts = async ():Promise<Post[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/posts').then( result => result.data);
};


export const findPosts = async (search: string):Promise<Post[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/posts', { params: {search} }).then( result => result.data);
};
