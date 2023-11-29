import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './slices/exchangeRatesSlice';
import exchangeSlice from './slices/exchangeSlice';

export const store = configureStore({
  reducer: {
    exchangeRates: exchangeRatesReducer,
    exchange: exchangeSlice,
  },
});
