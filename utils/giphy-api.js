const axios = require('axios');

const search = async (searchTerm) => {
  // axios.get('url')
  // fetch('url', {method: "GET"})
  // https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=spongebob+weights&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips
  const cleanSearchTerm = searchTerm.replace(" ", "+");
  const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${cleanSearchTerm}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
  return response;
};

module.exports = {
  search
};