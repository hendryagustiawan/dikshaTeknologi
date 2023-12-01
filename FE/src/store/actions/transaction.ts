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
