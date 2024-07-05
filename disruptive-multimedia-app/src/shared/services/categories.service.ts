import { ENDPOINTS } from "../config/environment";
import { Category, Post } from "../models";
import axios from "axios";

export const getCategories = async ():Promise<Category[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/categories').then( result => result.data);
};

export const getCategory = async (id: string):Promise<Category> => {
    return axios.get(ENDPOINTS.BASE_URL+'/categories/'+id).then( result => result.data);
};

export const getPostsByCategoryId = async (id:string):Promise<Post[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/categories/'+id+'/posts').then( result => result.data);
};