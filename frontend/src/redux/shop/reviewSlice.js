import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReviewThunk = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const response = await axios.post(
      `${getBaseUrl()}/api/shop/review/add`,
      formdata
    );

    return response.data;
  }
);

export const getReviewsThunk = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(
    `${getBaseUrl()}/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviewsThunk.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;