import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../models';



const category: Category = {
    _id: '',
    name: '',
    cover_image: '',
    allows_images: false,
    allows_youtube_videos: false,
    allows_documents: false,
};

const categorySlice = createSlice({
    name: 'user',
    initialState: category as Category,
    reducers:{
        setCategory: ( state ,action: {payload: Category})=>({
            ...action.payload
        })
    } 
});


export const selectCategory = (state: {category:Category}):Category => state.category;
export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;