import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddressThunk = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${getBaseUrl()}/api/shop/address/add`,
      formData
    );

    return response.data;
  }
);

export const fetchAllAddressesThunk = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${getBaseUrl()}/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

export const editaAddressThunk = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${getBaseUrl()}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const deleteAddressThunk = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${getBaseUrl()}/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddressThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddressThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddressThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddressesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddressesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddressesThunk.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;