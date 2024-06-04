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
      headers: { 'Authorization': "Bearer eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA2MjkyLCJpYXQiOjE3MTc1MDU5OTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYxMjQxMzkyLWQyMDctNGI4OS04ZDdjLWQwZTg5OGE0NmZmMSIsInN1YiI6Im1laHZpc2gwODgyLmJlMjFAY2hpdGthcmEuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQ2hpdGthcmEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiNjEyNDEzOTItZDIwNy00Yjg5LThkN2MtZDBlODk4YTQ2ZmYxIiwiY2xpZW50U2VjcmV0IjoidVRia1hGa1FHSGltcEZ4RCIsIm93bmVyTmFtZSI6Ik1laHZpc2ggQWdnYXJ3YWwiLCJvd25lckVtYWlsIjoibWVodmlzaDA4ODIuYmUyMUBjaGl0a2FyYS5lZHUuaW4iLCJyb2xsTm8iOiIyMTEwOTkwODgyIn0.cpeHAiQVjrN2Ey6fbxavC26Sj-vH2ffJfwZZ8xvx79o" },
      timeout: 500
    });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers: ${error.message}`);
    return [];
  }
};

module.exports = fetchNumbers;
