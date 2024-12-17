import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${getBaseUrl()}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const fetchCartItemsThunk = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${getBaseUrl()}/api/shop/cart/get/${userId}`
    );

    return response.data;
  }
);

export const deleteCartItemThunk = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${getBaseUrl()}/api/shop/cart/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantityThunk = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${getBaseUrl()}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

const cartSlice= createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCartThunk.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItemsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItemsThunk.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantityThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantityThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantityThunk.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItemThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItemThunk.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default cartSlice.reducer;