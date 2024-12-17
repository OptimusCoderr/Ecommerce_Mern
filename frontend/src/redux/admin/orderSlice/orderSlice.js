import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../../components/utils/getBaseUrl";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdminThunk = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${getBaseUrl()}/api/admin/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsForAdminThunk = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${getBaseUrl()}/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${getBaseUrl()}/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdminThunk.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdminThunk.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;