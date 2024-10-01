import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategory, getByIDCategory, updateCategory, deleteCategory } from "./categoryAction";

const initialState = {
    loading: false, 
    categoryLists: [],
    categoryInfo: null,
    message: "",
    error: null,
    success: false 
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearCategoryInfo: (state) => {
            state.categoryInfo = null;
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // createCategory
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryInfo = payload.data;
                state.message = payload.message;
                state.success = true;
            })
            .addCase(createCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
                state.success = false;
            })

            // Fetch category details
            .addCase(getByIDCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByIDCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryInfo = payload.data;
                state.message = payload.message;
                state.success = true;
            })
            .addCase(getByIDCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            })

            // updateCategory
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryInfo = { ...state.categoryInfo, ...payload };
                state.message = payload.message;
                state.success = true;
            })
            .addCase(updateCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            })

            // deleteCategory
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryInfo = null; // Handle based on your needs
                state.message = payload.message;
                state.success = true;
            })
            .addCase(deleteCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            })

            // getAllCategory
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryLists = payload.data.Category;
                state.message = payload.message;
                state.success = true;
            })
            .addCase(getAllCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.message = payload;
            });
    }
});

export const { clearCategoryInfo } = categorySlice.actions;
export default categorySlice.reducer;
