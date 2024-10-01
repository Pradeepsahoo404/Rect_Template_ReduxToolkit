import { createSlice } from "@reduxjs/toolkit";
import { createBrand , getAllBrand , getByIDBrand , updateBrand , deleteBrand } from "./brandAction";

const initialState = {
    loading : false, 
    brandLists: [],
    brandInfo : null,
    message : "",
    error : null,
    success : false 
}

const brandSlice = createSlice({
    name : 'brand',
    initialState,
    reducers : {
        clearBrandInfo : (state)=>{
            state.brandInfo = null;
            state.message = null;
            state.error = null;
        }
    },
    extraReducers : (builder)=>{
        builder
        //createBrand
        .addCase(createBrand.pending , (state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(createBrand.fulfilled , (state , {payload})=>{
          
            state.loading = false;
            state.brandInfo = payload.data;
            state.message = payload.message;
            state.success = true;   
        })
        .addCase(createBrand.rejected , (state , {payload})=>{
            state.loading = false;
            state.error = payload;
            state.message = payload;
            state.success = false;

        })
           // Fetch brand details
           .addCase(getByIDBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getByIDBrand.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.brandInfo = payload.data;
            state.message = payload.message;
            state.success = true
          })
          .addCase(getByIDBrand.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.message = payload;
          })

          //update Brand
          .addCase(updateBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateBrand.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.brandInfo = { ...state.brandInfo, ...payload };
            state.message = payload.message
            state.success = true;
          })
          .addCase(updateBrand.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.message = payload;
          })

          //delete brand
          .addCase(deleteBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteBrand.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.brandInfo = null; // or handle based on your needs
            state.message = payload.message;
            state.success = true;
          })
          .addCase(deleteBrand.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.message = payload;
          })

          //get all brand list
          .addCase(getAllBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAllBrand.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.brandLists = payload.data.brand; 
            state.message = payload.message;
            state.success = true;
          })
          .addCase(getAllBrand.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.message = payload;
          });
    }
})

export const { clearBrandInfo } = brandSlice.actions;
export default brandSlice.reducer;