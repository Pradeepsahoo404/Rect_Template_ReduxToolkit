import axios from "axios"; 
import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const baseUrl = process.env.REACT_APP_BASE_URL;


export const userLogin = createAsyncThunk(
    'users/admin_login' , async({mobile , password} , {rejectWithValue})=>{
        try{
            const config ={
                header : {
                    "Content-type" : "application/json"
                }
            }
            const {data} = await axios.post(`${baseUrl}users/admin_login` , {mobile , password} , config)

            localStorage.setItem('userToken' , data.data.accessToken)
            return data
        }catch(error){

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

export const registerUser = createAsyncThunk(
    'users/admin_register' , async({name , mobile ,email, password} , {rejectWithValue})=>{
        try{
            const config ={
                header : {
                    "Content-type" : "application/json"
                }
            }
             const {data} = await axios.post(`${baseUrl}users/admin_register` , {name , mobile ,email , password} ,config)
            
             return data
        }catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'users/forget-password' , async({email} , {rejectWithValue})=>{
        try{
            const config = {
                header : {
                    "Content-type" : "application/json"
                }
            }

            const {data} = await axios.post(`${baseUrl}users/forget-password` , {email} , config)
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

export const verifyForgetPassword = createAsyncThunk(
    'users/reset-password/:resetToken' , async({newPassword , confirmPassword , resetToken}, {rejectWithValue})=>{
        try{
            const config = {
                header : {
                    'Content-type' : 'application/json'
                }
            }

            const {data} = await axios.post(`${baseUrl}users/reset-password/${resetToken}` , {newPassword , confirmPassword} , config)
           
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


