import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResultsThunk = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `${getBaseUrl()}/api/shop/search/${keyword}`
    );

    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResultsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResultsThunk.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;