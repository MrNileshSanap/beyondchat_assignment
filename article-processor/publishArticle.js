const axios = require('axios');
require('dotenv').config();

async function publishArticle(articleId, content) {
  try {
    await axios.put(`${process.env.LARAVEL_API_URL}/articles/${articleId}`, { content });
    console.log('Article updated successfully!');
  } catch (err) {
    console.error('Error publishing article:', err.message);
    throw err;
  }
}

module.exports = publishArticle;
