import { ENDPOINTS } from "../config/environment";
import { Category, Post } from "../models";
import axios from "axios";
import { getToken } from "./auth.service";

export const getCategories = async ():Promise<Category[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/categories').then( result => result.data);
};

export const getCategory = async (id: string):Promise<Category> => {
    return axios.get(ENDPOINTS.BASE_URL+'/categories/'+id).then( result => result.data);
};

export const createCategory = async (category: Category):Promise<Category> => {
    const token = getToken();
    const {name, cover_image, allows_images, allows_youtube_videos, allows_documents}= category;
    return axios.post(ENDPOINTS.BASE_URL+'/categories/', {name, cover_image, allows_images, allows_youtube_videos, allows_documents} , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then( result => result.data);
};

export const uploadCategoryFile = async (categoryId: string, formData: FormData):Promise<Category> => {
    const token = getToken();
    return axios.post(ENDPOINTS.BASE_URL+'/categories/'+categoryId+'/file', formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Important for file uploads
            }
        }
    ).then( result => result.data);
};

export const getPostsByCategoryId = async (id:string):Promise<Post[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/categories/'+id+'/posts').then( result => result.data);
};