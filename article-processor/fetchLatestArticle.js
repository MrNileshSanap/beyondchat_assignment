const axios = require('axios');
require('dotenv').config();

async function getLatestArticle(articleId = null) {
  try {
    if (articleId) {
      const res = await axios.get(`${process.env.LARAVEL_API_URL}/articles/${articleId}`);
      return res.data;
    } else {
      const res = await axios.get(`${process.env.LARAVEL_API_URL}/articles?sort=latest&limit=1`);
      return res.data[0];
    }
  } catch (error) {
    console.error('Error fetching latest article:', error.message);
    throw error;
  }
}

module.exports = getLatestArticle;
