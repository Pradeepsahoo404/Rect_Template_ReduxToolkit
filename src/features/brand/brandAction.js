import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.REACT_APP_BASE_URL;

//create brand
export const createBrand = createAsyncThunk(
    'users/create_brand',
    async({ formData, token }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            };

            const { data } = await axios.post(`${baseUrl}users/create_brand`, formData, config);
            // console.log(data.lengh ,"thisismememe")
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getByIDBrand = createAsyncThunk(
    'users/view_brand',
    async ({ brandId, token }, { rejectWithValue }) => {
        try {
            console.log(brandId, "brandId");
            console.log(token, "token");

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    brandId: brandId
                }
            };

            const { data } = await axios.get(`${baseUrl}users/view_brand`, config);
            console.log(data, "data");
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

//update brand
export const updateBrand = createAsyncThunk(
    'users/update_brand' , async({formData , token , id } , { rejectWithValue })=>{ 
        try{
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            };
            const { data } = await axios.put(`${baseUrl}users/update_brand/${id}` , formData , config);
            
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
//delete brand
// export const deleteBrand = createAsyncThunk(
//     'users/delete_brand' , async({brandId , token} ,{rejectWithValue})=>{
//         try{
//             console.log(brandId, "brandId");
//             console.log(token, "token");

//             const config = {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 },
//                 params: {
//                     brandId: brandId
//                 }
//             };

//             const {data} = await axios.post(`${baseUrl}user/delete_brand` , config)
//             console.log(data , "anmol")
//             return data
//         }catch(error){
//             if(error.response && error.response.data.message){
//                 return rejectWithValue(error.response.data.message)
//             }else{
//                 return rejectWithValue(error.message)
//             }   
//         }
//     }
// )

export const deleteBrand = createAsyncThunk(
    'brands/deleteBrand',
    async ({ brandId, token }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            const response = await axios.post(
                `${baseUrl}users/delete_brand?brandId=${brandId}`,{ brandId }, config
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

//all brand
export const getAllBrand = createAsyncThunk(
    'users/get_brand_list' , async({token} , {rejectWithValue})=>{
        try{

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`${baseUrl}users/get_brand_list`, config )
            console.log(data , "data")
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