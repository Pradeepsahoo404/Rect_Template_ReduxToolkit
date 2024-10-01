import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createProduct = createAsyncThunk(
    'users/create_product' , async({formData , token} , {rejectWithValue})=>{
        try{
            console.log("formDataformData" , formData)
            const config = {
                headers : {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            }

            const {data} = await axios.post(`${baseUrl}users/create_product` , formData , config)
            return data

        }catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const getByIdProduct = createAsyncThunk(
    'users/view_product' , async({id , token} , {rejectWithValue})=>{

        try{
            console.log("idididididid" , id)
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`${baseUrl}users/view_product/${id}`, config);
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

export const updateProduct = createAsyncThunk(
    'users/update_product' , async({formData , token , id} , {rejectWithValue}) => {
        try{

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await axios.put(`${baseUrl}users/update_brand/${id}` , formData , config);
            
            return data

        }catch(error){

        }
    }
) 

export const deleteProduct = createAsyncThunk(
    'users/delete_product',
    async ({ productId, token }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            const response = await axios.post(
                `${baseUrl}users/delete_product?productId=${productId}`,{ productId }, config
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

export const getAllProduct = createAsyncThunk(
    'users/get_product_list' , async({token} , {rejectWithValue})=>{
        try{

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`${baseUrl}users/get_product_list`, config )
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

export const get_category_by_brand = createAsyncThunk(
    'user/get_category_by_brand' , async({brandId , token} , {rejectWithValue})=>{
        try{
            console.log("brandId" , brandId , "token" , token)
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            const  data  = await axios.post(`${baseUrl}users/get_category_by_brand` , { brandId } , config)
            console.log("datadta" , data.data)
            return data;
            
        }catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }  
        }
    }
)

export const get_subcategory_by_category = createAsyncThunk(
    'user/get_subcategory_by_category' , async({categoryId , token} , {rejectWithValue})=>{
        try{
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

        const  data  = await axios.post(`${baseUrl}users/get_subcategory_by_category` , {categoryId} , config)
            return data;

        }catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }  
        }
    }
)