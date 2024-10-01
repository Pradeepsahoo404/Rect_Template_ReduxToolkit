import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin ,forgetPassword , verifyForgetPassword} from "./authAction";

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  message:"",
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.message = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.message = 'Credentials set successfully';
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log(payload , "payload")
        state.loading = false;
        state.userInfo = payload;
        state.message = payload.message
        state.userToken = payload.data.accessToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state , { payload }) => {
        console.log("Register Fulfilled Payload:", payload.message);
        state.loading = false;
        state.success = true;
        state.message = payload.message
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.message = payload;
      })

          // forget-password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null; // Set error to null to clear any previous errors
      })
      .addCase(forgetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
      })
      .addCase(forgetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // Directly assign payload to error
        state.message = payload;
      })

      // verifyForgetPassword
      .addCase(verifyForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null; // Set error to null to clear any previous errors
      })
      .addCase(verifyForgetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
      })
      .addCase(verifyForgetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // Directly assign payload to error
        state.message = payload;
      })

  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
