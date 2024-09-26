import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const resetMedicine = createAction("medicine/created-medicine");

export const createPostAction = createAsyncThunk(
  "medicine/created",
  async (medicine, { rejectWithValue, getState, dispatch }) => {
    console.log(medicine);

    // http call
    try {
      const formData = new FormData();
      formData.append("medicinename", medicine?.medicinename);
      formData.append("description", medicine?.description);
      formData.append("image", medicine?.image);
      formData.append("price", medicine?.price);
      formData.append("category", medicine?.category);
      formData.append("diseaseType", medicine?.diseaseType);
      formData.append("vendorCity", medicine?.vendorCity);
      formData.append("vendorID", medicine?.vendorID);
      formData.append("stock", medicine?.stock);

      console.log("formData");
      // console.log(formData)
      const { data } = await axios.post(
        `http://localhost:3000/medicine`,
        formData
      );
      //  dispatch the action
      dispatch(resetMedicine());
      return data;
    } catch (error) {
      if (!error.response) throw Error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// delete medicine
export const deletemedicineDetails = createAsyncThunk(
  "medicine/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      try {
        // console.log(formData)
        const { data } = await axios.delete(
          `http://localhost:3000/medicine/${id}`
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

// details medicine
export const medicinedetails = createAsyncThunk(
  "medicine/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/medicine/${id}`
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

// update medicine here
export const medicineUpdate = createAsyncThunk(
  "medicine/update",
  async (medicine, { rejectWithValue, getState, dispatch }) => {
    try {
      try {
        // console.log(formData)
        const { data } = await axios.put(
          `http://localhost:3000/medicine/${id}`,
          {
            medicinename: medicine?.medicinename,
            description: medicine?.description,
            price: medicine?.price,
          }
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

export const searchMedicine = createAsyncThunk(
  "medicine/search",
  async (searchTerm, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/medicine/search`,
        {
          params: { searchTerm: searchTerm }, // Adjust the API endpoint and query parameter as needed
        }
      );
      return data;
    } catch (error) {
      if (!error.response) throw Error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const medicineSlices = createSlice({
  name: "medicine",
  initialState: { searchResults: [] },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state, action) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetMedicine, (state, action) => {
      state.isCreated = false;
      state.searchResults = [];
    });

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.medicine = action?.payload;
      state.isCreated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // details
    builder.addCase(medicinedetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(medicinedetails.fulfilled, (state, action) => {
      state.loading = false;
      state.medicineDetails = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(medicinedetails.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    // delete
    builder.addCase(deletemedicineDetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deletemedicineDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.medicineDelete = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(deletemedicineDetails.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    //  update
    builder.addCase(medicineUpdate.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(medicineUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.medicineUpdate = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(medicineUpdate.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });

    builder.addCase(searchMedicine.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(searchMedicine.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(searchMedicine.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error;
    });
  },
});
export const { setSearchResults, clearSearchResults } = medicineSlices.actions;
export default medicineSlices.reducer;
