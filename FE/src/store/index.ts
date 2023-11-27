import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productSlice from './slice/product';
import transactionSlice from './slice/transaction';
import productVariantSlice from './slice/productVariant';

export const store = configureStore({
  reducer: {
    product: productSlice,
    transactions: transactionSlice,
    productVariant: productVariantSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
