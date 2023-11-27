import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../models/product';
import axios from 'axios';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (ProductId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/${ProductId}`,
        {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
