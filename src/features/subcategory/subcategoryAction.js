import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Create SubCategory
export const createSubCategory = createAsyncThunk(
  'users/create_subcategory',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${baseUrl}users/create_subcategory`, 
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

// Get SubCategory by ID
export const getByIDSubCategory = createAsyncThunk(
  'users/view_subcategory',
  async({ subCategoryId, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: {
            subCategoryId: subCategoryId
        }
      };
      const { data } = await axios.get(`${baseUrl}users/view_subcategory`, config);

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

// Update SubCategory
export const updateSubCategory = createAsyncThunk(
  'users/update_subcategory',
  async({ formData, token, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };

      const { data } = await axios.put(`${baseUrl}users/update_subcategory/${id}`, formData, config);
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

// Delete SubCategory
export const deleteSubCategory = createAsyncThunk(
  'users/delete_subcategory',
  async({ subCategoryId, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };

      const response = await axios.post(`${baseUrl}users/delete_subcategory?subCategoryId=${subCategoryId}`, { subCategoryId }, config);

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

// Get All SubCategories
export const getAllSubCategory = createAsyncThunk(
  'users/get_all_subcategory',
  async({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };

      const { data } = await axios.get(`${baseUrl}users/get_all_subcategory`, config);
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
