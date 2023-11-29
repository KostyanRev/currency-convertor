import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExchangeRates,
  setExchangeRates,
} from '../redux/slices/exchangeRatesSlice';

const Header = () => {
  const dispatch = useDispatch();

  const { usdToUanRate, eurToUanRate } = useSelector(selectExchangeRates);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const { data } = await axios(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`
      );

      const usdToUanRate = findExchangeRate(data, 840);
      const eurToUanRate = findExchangeRate(data, 978);

      dispatch(setExchangeRates({ usdToUanRate, eurToUanRate }));
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const findExchangeRate = (data, currencyCode) => {
    const rateObject = data.find((item) => item.r030 === currencyCode);
    return rateObject ? rateObject.rate : null;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Currency Exchange
        </Typography>
        <Box
          sx={{
            display: 'flex',
            margin: '0 auto',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant="subtitle3" style={{ marginRight: '20px' }}>
            {usdToUanRate ? `1 USD = ${usdToUanRate} UAH` : 'Loading...'}
          </Typography>
          <Typography variant="subtitle3">
            {eurToUanRate ? `1 EUR = ${eurToUanRate} UAH` : 'Loading...'}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
