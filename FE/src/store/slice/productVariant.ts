import { createSlice } from '@reduxjs/toolkit';
import {
  getProductVariant,
  deleteProductVariant
} from '../actions/productVariant';

export const productVariantSlice = createSlice({
  name: 'productVariant',
  initialState: {
    list: {
      isLoading: false,
      status: '',
      values: []
    }
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProductVariant.fulfilled, (state, action) => {
        state.list.status = 'success';
        state.list.values = action.payload;
        state.list.isLoading = false;
      })
      .addCase(getProductVariant.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(deleteProductVariant.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      });
  }
});

export default productVariantSlice.reducer;
