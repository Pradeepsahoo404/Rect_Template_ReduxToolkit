import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../features/auth/authSlice";
import headerSlice from "../../features/common/headerSlice";
import rightDrawerSlice from "../../features/common/rightDrawerSlice";
import modalSlice from "../../features/common/modalSlice";
import leadsSlice from "../../features/leads/leadSlice";
import brandSlice from "../../features/brand/brandSlice";
import categorySlice from "../../features/category/categorySlice";
import subcategorySlice from "../../features/subcategory/subcategorySlice";
import productSlice from "../../features/product/productSlice";
import { authApi } from "./auth/authService";

const store = configureStore({
    reducer: {
      header : headerSlice,
      rightDrawer : rightDrawerSlice,
      modal : modalSlice,
      lead : leadsSlice,
      brand : brandSlice,
      category : categorySlice,
      subCategory : subcategorySlice,
      product : productSlice,
      auth: authSlice,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  })

  export default store