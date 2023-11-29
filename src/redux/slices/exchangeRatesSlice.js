import { createSlice } from '@reduxjs/toolkit';

export const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: {
    usdToUanRate: null,
    eurToUanRate: null,
    loading: true,
  },
  reducers: {
    setExchangeRates: (state, action) => {
      state.usdToUanRate = action.payload.usdToUanRate;
      state.eurToUanRate = action.payload.eurToUanRate;
      state.loading = false;
    },
  },
});

export const { setExchangeRates } = exchangeRatesSlice.actions;

export const selectExchangeRates = (state) => state.exchangeRates;

export default exchangeRatesSlice.reducer;
