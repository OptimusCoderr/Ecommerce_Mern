import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImagesThunk = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${getBaseUrl()}/api/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImageThunk = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${getBaseUrl()}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImagesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImagesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImagesThunk.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;