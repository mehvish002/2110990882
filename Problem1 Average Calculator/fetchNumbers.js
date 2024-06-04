const axios = require('axios');

const endpoints = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand'
};

const fetchNumbers = async (type, authToken) => {
  try {
    const response = await axios.get(endpoints[type], {
      headers: { 'Authorization': authToken },
      timeout: 500
    });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers: ${error.message}`);
    return [];
  }
};

module.exports = fetchNumbers;
