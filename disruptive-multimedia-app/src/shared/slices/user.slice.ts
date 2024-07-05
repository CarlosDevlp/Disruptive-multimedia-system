import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models';



const user: User = {
    _id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    role_name: '',
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: user as User,
    reducers:{
        setUser: ( state ,action: {payload: User})=>({
            ...action.payload
        }),
        setToken: ( state ,action: {payload: string})=>({
            ...state,
            token: action.payload,
        })
    } 
});


export const selectUser = (state: {user:User}):User => state.user;
export const selectUserId = (state: {user:User}):string => state.user._id;
export const selectRoleName = (state: {user:User}):string => state.user.role_name;
export const selectToken = (state: {user:User}):string => state.user.token;
export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;