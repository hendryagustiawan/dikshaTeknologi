import { createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../../models/transaction';
import axios from 'axios';

export const getTransactions = createAsyncThunk(
  'transaction/getTransactions',
  async () => {
    try {
      const response = await axios.get('http://localhost:3000/transaction/', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransactions',
  async (transactionId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/transaction/${transactionId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
