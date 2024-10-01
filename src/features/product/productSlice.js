import { createSlice } from "@reduxjs/toolkit";
import { createProduct , getByIdProduct , updateProduct , deleteProduct , getAllProduct , get_category_by_brand ,get_subcategory_by_category } from "./productAction";
const initialState = {
  loading: false,
  product : false,
  productLists: [],
  categoryLists : [],
  SubCategoryLists : [],
  productInfo: null,
  message: "",
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductInfo: (state) => {
      state.productInfo = null;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productInfo = payload.data;
        state.message = payload.message;
        state.success = true;
        state.product = true;
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
        state.success = false;
      })

      // Fetch product details
      .addCase(getByIdProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productInfo = payload.data;
        state.message = payload.message;
        state.success = true;
      })
      .addCase(getByIdProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productInfo = { ...state.productInfo, ...payload };
        state.message = payload.message;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productInfo = null;
        state.message = payload.message;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })

      // Get all product lists
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productLists = payload.data.products;
        state.message = payload.message;
        state.success = true;
      })
      .addCase(getAllProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })
      
      // Get all category lists
      .addCase(get_category_by_brand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_category_by_brand.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categoryLists = payload.data.data || [];
        state.message = payload.message;
        state.success = true;
      })
      .addCase(get_category_by_brand.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })

      // Get all SubCategory lists
      .addCase(get_subcategory_by_category.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_subcategory_by_category.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.SubCategoryLists = payload.data.data || [];
        state.message = payload.message;
        state.success = true;
      })
      .addCase(get_subcategory_by_category.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      });
  },
});

export const { clearProductInfo } = productSlice.actions;
export default productSlice.reducer;
