import { createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct
} from '../actions/product';

export const productSlice = createSlice({
  name: 'product',
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
      .addCase(getProducts.fulfilled, (state, action) => {
        state.list.status = 'success';
        state.list.values = action.payload;
        state.list.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.status = 'success';
        console.log(action);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list.status = 'success';
        console.log(action);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      });
  }
});

export default productSlice.reducer;
