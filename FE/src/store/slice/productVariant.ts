import { createSlice } from '@reduxjs/toolkit';
import { getProductVariant, deleteProduct } from '../actions/productVariant';

export const productVariantSlice = createSlice({
  name: 'productVariant',
  initialState: {
    list: {
      isLoading: false,
      status: '',
      values: []
    },
    save: {
      isSaving: false,
      isDeleting: false
    }
  },
  reducers: {
    clearSuccessMessage: (state, payload) => {
      // TODO: Update state to clear success message
    }
  },

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
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      });
  }
});

export default productVariantSlice.reducer;
