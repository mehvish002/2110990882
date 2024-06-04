const express = require('express');
const fetchNumbers = require('./fetchNumbers');
const filterNumbers = require('./filterNumbers');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = 3000
const WINDOW_SIZE = 10;

let windowState = [];

app.use(async (req, res, next) => {
  const authToken = req.headers['authorization'];

  if (authToken && !isTokenExpired(authToken)) {
    return res.status(401).json({ message: 'Token expired. Please log in again.' });
  }

  next();
});

// Function to check if token is expired
const isTokenExpired = (token) => {
  const decodedToken = jwt.decode(token);
  if (!decodedToken || !decodedToken.exp) {
    return true; 
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const authToken = req.headers['authorization'];

  if (!authToken) {
    return res.status(401).json({ message: 'An authorization header is required' });
  }

  if (!['p', 'f', 'e', 'r'].includes(type)) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  const previousState = [...windowState];
  const newNumbers = await fetchNumbers(type, authToken);

  windowState = filterNumbers(windowState, newNumbers, WINDOW_SIZE);
  const average = windowState.length ? (windowState.reduce((a, b) => a + b, 0) / windowState.length).toFixed(2) : 0;

  res.json({
    numbers: newNumbers,
    windowPrevState: previousState,
    windowCurrState: windowState,
    avg: parseFloat(average)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});