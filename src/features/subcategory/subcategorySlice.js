import { createSlice } from "@reduxjs/toolkit";
import { createSubCategory , getByIDSubCategory , updateSubCategory , deleteSubCategory , getAllSubCategory } from "./subcategoryAction";
const initialState = {
    loading: false, 
    subCategoryLists: [],
    subCategoryInfo: null,
    message: "",
    error: null,
    success: false 
};

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {
        clearSubCategoryInfo: (state) => {
            state.subCategoryInfo = null;
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // createSubCategory
            .addCase(createSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategoryInfo = payload.data;
                state.message = payload.message;
                state.success = true;
            })
            .addCase(createSubCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
                state.success = false;
            })

            // Fetch subCategory details
            .addCase(getByIDSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByIDSubCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategoryInfo = payload.data;
                state.message = payload.message;
                state.success = true;
            })
            .addCase(getByIDSubCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            })

            // updateSubCategory
            .addCase(updateSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategoryInfo = { ...state.subCategoryInfo, ...payload };
                state.message = payload.message;
                state.success = true;
            })
            .addCase(updateSubCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            })

            // deleteSubCategory
            .addCase(deleteSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategoryInfo = null; // Handle based on your needs
                state.message = payload.message;
                state.success = true;
            })
            .addCase(deleteSubCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            })

            // getAllSubCategory
            .addCase(getAllSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategoryLists = payload.data.subCategory;
                state.message = payload.message;
                state.success = true;
            })
            .addCase(getAllSubCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            });
    }
});

export const { clearSubCategoryInfo } = subCategorySlice.actions;
export default subCategorySlice.reducer;
