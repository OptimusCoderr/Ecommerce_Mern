import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null, // Added error state
};

export const fetchAllFilteredProductsThunk = createAsyncThunk(
  "shoppingProducts/fetchAllProducts",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
      try {
          const query = new URLSearchParams({
              ...filterParams,
              sortBy: sortParams,
          });

          const result = await axios.get(
              `${getBaseUrl()}/api/shop/products/get?${query}`
          );

          return result.data; // Ensure this returns the correct data structure
      } catch (error) {
          console.error("Error fetching products:", error);
          return rejectWithValue(error.response.data); // Handle error
      }
  }
);

export const fetchProductDetailsThunk = createAsyncThunk(
  "shoppingProducts/fetchProductDetails",
  async (id) => {
      const result = await axios.get(`${getBaseUrl()}/api/shop/products/get/${id}`);
      return result.data; // Adjust this if necessary
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
        state.productDetails = null
    }
  },
  extraReducers: (builder) => {
      builder
          .addCase(fetchAllFilteredProductsThunk.pending, (state) => {
              state.isLoading = true;
              state.error = null; // Reset error on new request
          })
          .addCase(fetchAllFilteredProductsThunk.fulfilled, (state, action) => {
              state.isLoading = false;
              state.productList = action.payload.data; // Ensure this matches your API response
          })
          .addCase(fetchAllFilteredProductsThunk.rejected, (state, action) => {
              state.isLoading = false;
              state.productList = [];
              state.error = action.error.message; // Store error message
              console.error("Error fetching products:", action.error.message);
              /**FETCH PRODUCT DETAILS */
          }).addCase(fetchProductDetailsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null; // Reset error on new request
          })
          .addCase(fetchProductDetailsThunk.fulfilled, (state, action) => {
              state.isLoading = false;
              state.productDetails = action.payload.data; // Ensure this matches your API response
          })
          .addCase(fetchProductDetailsThunk.rejected, (state, action) => {
              state.isLoading = false;
              state.productDetails = [];
              state.error = action.error.message; // Store error message
              console.error("Error fetching products:", action.error.message);
          });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;