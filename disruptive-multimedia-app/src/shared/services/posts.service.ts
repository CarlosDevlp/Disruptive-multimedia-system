import { ENDPOINTS } from "../config/environment";
import { Post } from "../models";
import axios from "axios";
import { getToken } from "./auth.service";

export const getPosts = async ():Promise<Post[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/posts').then( result => result.data);
};


export const findPosts = async (search: string):Promise<Post[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/posts', { params: {search} }).then( result => result.data);
};


export const getContentTypes = async ():Promise<string[]> => {
    return axios.get(ENDPOINTS.BASE_URL+'/posts/content-types').then( result => result.data);
};


export const createPost = async (post: Post):Promise<Post> => {
    const token = getToken();
    const {title, category, user, content, content_type}= post;
    return axios.post(ENDPOINTS.BASE_URL+'/posts', {title, category, user, content, content_type} , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then( result => result.data);
};

export const uploadPostFile = async (postId: string, formData: FormData):Promise<Post> => {
    const token = getToken();
    return axios.post(ENDPOINTS.BASE_URL+'/posts/'+postId+'/file', formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Important for file uploads
            }
        }
    ).then( result => result.data);
};