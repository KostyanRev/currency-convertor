import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExchange,
  setExchangeRate,
  setFromAmount,
  setFromCurrency,
  setToAmount,
  setToCurrency,
} from '../redux/slices/exchangeSlice';

const currencies = ['USD', 'EUR', 'UAH'];

const ExchangeBlock = () => {
  // const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  // const [toCurrency, setToCurrency] = useState(currencies[1]);
  // const [fromAmount, setFromAmount] = useState('');
  // const [toAmount, setToAmount] = useState('');
  // const [exchangeRate, setExchangeRate] = useState({});
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, fromAmount, toAmount, exchangeRate } =
    useSelector(selectExchange);

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();

      if (data && data.rates) {
        dispatch(setExchangeRate(data.rates));
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const handleCurrencyChange = (event, type) => {
    const value = event.target.value;
    if (type === 'from') {
      dispatch(setFromCurrency(value));
    } else {
      dispatch(setToCurrency(value));
    }

    dispatch(setToAmount(''));
    dispatch(setFromAmount(''));
  };

  const handleAmountChange = (event, type) => {
    const value = event.target.value;

    if (type === 'from') {
      dispatch(setFromAmount(value));
      dispatch(
        setToAmount(
          (
            (parseFloat(value) * (exchangeRate[toCurrency] || 1)) /
            (exchangeRate[fromCurrency] || 1)
          ).toFixed(4)
        )
      );
    } else {
      dispatch(setToAmount(value));
      dispatch(
        setFromAmount(
          (
            (parseFloat(value) * (exchangeRate[fromCurrency] || 1)) /
            (exchangeRate[toCurrency] || 1)
          ).toFixed(4)
        )
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="0"
              fullWidth
              type="number"
              label="From Amount"
              value={fromAmount}
              onChange={(event) => handleAmountChange(event, 'from')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              select
              label="From Currency"
              value={fromCurrency}
              onChange={(event) => handleCurrencyChange(event, 'from')}>
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="0"
              fullWidth
              type="number"
              label="To Amount"
              value={toAmount}
              onChange={(event) => handleAmountChange(event, 'to')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              select
              label="To Currency"
              value={toCurrency}
              onChange={(event) => handleCurrencyChange(event, 'to')}>
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ExchangeBlock;
