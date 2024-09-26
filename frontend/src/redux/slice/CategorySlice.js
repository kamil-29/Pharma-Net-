import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const resetCategory = createAction("category/reset");

export const CategotyListAction = createAsyncThunk(
  "category/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // http call
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      // console.log(formData)
      const { data } = await axios.get(
        `http://localhost:3000/category`,
        headers
      );
      return data;
    } catch (error) {
      if (!error.response) throw Error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// create category
export const CreateCategotyAction = createAsyncThunk(
  "category/create",
  async (title, { rejectWithValue, getState, dispatch }) => {
    // http call
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      // console.log(formData)
      const { data } = await axios.post(
        `http://localhost:3000/category`,
        {
          title: title?.title,
        },
        headers
      );
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
      // return rejectWithValue(error?.response?.status);
    }
  }
);

// category single list

export const SingleCategotyAction = createAsyncThunk(
  "category/single",
  async (id, { rejectWithValue, getState, dispatch }) => {
    // http call
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      // console.log(formData)
      const { data } = await axios.get(
        `http://localhost:3000/category/${id}`,
        headers
      );
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
      if (!error.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update category
export const UpdateCategotyAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // http call
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      // console.log(formData)
      const { data } = await axios.put(
        `http://localhost:3000/category/${category?.id}`,
        {
          title: category?.title,
        },
        headers
      );
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
      if (!error.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// deletecategory
export const deletecategoryDetails = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      try {
        // console.log(formData)
        const { data } = await axios.delete(
          `http://localhost:3000/category/${id}`
        );
        return data;
      } catch (error) {
        if (!error.response) throw Error;
        return rejectWithValue(error?.response?.data);
      }
    } catch (error) {
      if (!error.response) throw Error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    // reset
    builder.addCase(resetCategory, (state, action) => {
      // Reset the state to its initial values
      state.loading = false;
      state.categoryList = undefined;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.category = undefined;
      state.Singlecategory = undefined;
      state.Updatecategory = undefined;
      state.deletecategory = undefined;
    });
    builder.addCase(CategotyListAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CategotyListAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(CategotyListAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // create
    builder.addCase(CreateCategotyAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateCategotyAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.isCreated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(CreateCategotyAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // single
    builder.addCase(SingleCategotyAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SingleCategotyAction.fulfilled, (state, action) => {
      state.loading = false;
      state.Singlecategory = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(SingleCategotyAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // update
    builder.addCase(UpdateCategotyAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateCategotyAction.fulfilled, (state, action) => {
      state.loading = false;
      state.Updatecategory = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(UpdateCategotyAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // delete
    builder.addCase(deletecategoryDetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deletecategoryDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.deletecategory = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(deletecategoryDetails.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });
  },
});

export default categorySlices.reducer;
