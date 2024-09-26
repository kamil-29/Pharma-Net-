import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { resetCart } from "./customerSlice";

export const resetLoginLogout = createAction("user/reset");

export const UserLoginAction = createAsyncThunk("user/login", async (user, { rejectWithValue, getState, dispatch }) => {
  // http call
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    // console.log(formData)
    const { data } = await axios.post(
      `http://localhost:3000/user/login`,
      {
        email: user?.email,
        password: user?.password,
      },
      headers
    );

    localStorage.setItem("token", data?.token);
    dispatch(resetCart());
    return data;
  } catch (error) {
    console.error("Error user Login:", error);
    if (!error.response) throw error?.response?.data;
    return rejectWithValue(error?.response?.data);
  }
});

// vendor login

export const VendorLoginAction = createAsyncThunk("vendor/login", async (vendor, { rejectWithValue, getState, dispatch }) => {
  // http call
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    // console.log(formData)
    const { data } = await axios.post(
      `http://localhost:3000/vendorlogin`,
      {
        business_email: vendor?.business_email,
        password: vendor?.password,
      },
      headers
    );

    localStorage.setItem("token", data?.token);
    return data;
  } catch (error) {
    console.error("Error user Login:", error);
    if (!error.response) throw error?.response?.data;
    return rejectWithValue(error?.response?.data);
  }
});
export const AdminLoginAction = createAsyncThunk("admin/login", async (admin, { rejectWithValue, getState, dispatch }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.post(
      `http://localhost:3000/adminLogin`,
      {
        business_email: admin?.business_email,
        password: admin?.password,
      },
      { headers }
    );

    localStorage.setItem("token", data?.token);
    return data;
  } catch (error) {
    console.error("Error admin Login:", error);
    if (!error.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
});
// user logout
export const UserLogoutAction = createAction("user/logout");

export const userLogout = createAsyncThunk("user/logout", async (_, { dispatch }) => {
  // You can perform any necessary cleanup or additional actions here
  localStorage.removeItem("token");
  dispatch(UserLogoutAction()); // Dispatch the synchronous action after successful logout
  dispatch(resetCart());
});

const userSlices = createSlice({
  name: "user",
  initialState: {},
  extraReducers: (builder) => {
    // post login
    builder.addCase(resetLoginLogout, (state, action) => {
      state.isLogin = false;
      state.isLogout = false;
    });
    builder.addCase(UserLoginAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UserLoginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.LoginData = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isLogin = true;
    });

    builder.addCase(UserLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // vendor login
    builder.addCase(VendorLoginAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(VendorLoginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.LoginData = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isLogin = true;
    });

    builder.addCase(VendorLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // admin login
    builder.addCase(AdminLoginAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(AdminLoginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.LoginData = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isLogin = true;
    });

    builder.addCase(AdminLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // user logout
    builder.addCase(UserLogoutAction, (state) => {
      // Clear user-related state here if needed
      state.LoginData = null;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isLogout = true;
    });
  },
});

export default userSlices.reducer;
