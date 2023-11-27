import { createSlice } from '@reduxjs/toolkit';
import { getTransactions, deleteTransaction } from '../actions/transaction';

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    list: {
      isLoading: false,
      status: '',
      values: []
    }
  },
  reducers: {
    clearSuccessMessage: (state, payload) => {
      // TODO: Update state to clear success message
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.list.status = 'success';
        state.list.values = action.payload;
        state.list.isLoading = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.isLoading = false;
      });
  }
});

export default transactionSlice.reducer;
