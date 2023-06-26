const axios = require('axios');

const getQuote = async () => {
  // axios.get('url')
  // fetch('url', {method: "GET"})
  const response = await axios.get(process.env.API_QUOTE_URL)
  return response;
};

module.exports = {
  getQuote
};