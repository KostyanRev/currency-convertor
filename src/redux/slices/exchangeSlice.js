import { createSlice } from '@reduxjs/toolkit';

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    fromAmount: '',
    toAmount: '',
    exchangeRate: {},
  },
  reducers: {
    setFromCurrency: (state, action) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
    },
    setFromAmount: (state, action) => {
      state.fromAmount = action.payload;
    },
    setToAmount: (state, action) => {
      state.toAmount = action.payload;
    },
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
  },
});

export const {
  setFromCurrency,
  setToCurrency,
  setFromAmount,
  setToAmount,
  setExchangeRate,
} = exchangeSlice.actions;

export const selectExchange = (state) => state.exchange;

export default exchangeSlice.reducer;
