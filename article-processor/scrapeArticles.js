const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeArticle(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    return paragraphs.join('\n');
  } catch (err) {
    console.error('Error scraping:', url, err.message);
    return '';
  }
}

module.exports = scrapeArticle;
