import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./authslice/authSlice"

import AdminProductSlice from "./admin/productSlice/productSlice"
import AdminOrderSlice from "./admin/orderSlice/orderSlice"

import ShopProductSlice from "./shop/productSlice"
import ShopCartSlice from "./shop/cartSlice"
import ShopAddressSlice from "./shop/addressSlice"
import ShopOrderSlice from "./shop/orderSlice"
import ShopSearchSlice from "./shop/searchSlice"
import ShopReviewSlice from "./shop/reviewSlice"

import commonFeatureSlice from "./commonSlice/commonSlice"


export const store = configureStore({
  reducer: {
    auth: authSlice,
    
    adminProducts: AdminProductSlice,
    adminOrder: AdminOrderSlice,

    shopProduct: ShopProductSlice,
    shopCart: ShopCartSlice,
    shopAddress: ShopAddressSlice,
    shopOrder: ShopOrderSlice,  
    shopSearch: ShopSearchSlice,
    shopReview: ShopReviewSlice,

    commonFeature: commonFeatureSlice,
   
    
  }
})

export default store;