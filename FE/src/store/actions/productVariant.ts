import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductVariant } from '../../models/productVariant';
import axios from 'axios';

export const getProductVariant = createAsyncThunk(
  'productVariant/getProductVariant',
  async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product-variant/${id}`,
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
