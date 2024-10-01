import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.REACT_APP_BASE_URL;


export const createCategory = createAsyncThunk(
  'users/create_category',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

   
      const response = await axios.post(
        `${baseUrl}users/create_category`, 
        data, 
        config
      );
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getByIDCategory = createAsyncThunk(
    'users/view_category',
    async({categoryId , token} , {rejectWithValue})=>{
        try{
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                },
                params : {
                    categoryId : categoryId
                }
            }
            const { data } = await axios.get(`${baseUrl}users/view_category` , config)

            return data
        } catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const updateCategory = createAsyncThunk(
    'users/update_category' , async({formData , token , id} , {rejectWithValue}) => {
        try{
            const config = {
                headers :{
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}` 
               }
            }

            const {data} = await axios.put(`${baseUrl}users/update_category/${id}` , formData , config);
            return data;

        } catch(error){
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            } 
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'users/delete_category' ,
        async({categoryId , token} , {rejectWithValue})=>{
        try{
            console.log(categoryId , "categoryId")
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.post(`${baseUrl}users/delete_category?categoryId=${categoryId}` ,{categoryId} , config )

            return response.data
        }catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const getAllCategory = createAsyncThunk(
    'users/get_all_category' , async({token} , {rejectWithValue}) => {
        try{

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            const {data} = await axios.get(`${baseUrl}users/get_all_category` , config)
            return data

        }catch(error){
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            } 
        }
    }
)