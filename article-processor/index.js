const express = require('express');
const cors = require('cors');
require('dotenv').config();

const getLatestArticle = require('./fetchLatestArticle');
const searchGoogle = require('./googleSearch');
const scrapeArticle = require('./scrapeArticles');
const rewriteArticle = require('./enhanceArticle');
const publishArticle = require('./publishArticle');

const app = express();
app.use(cors());
app.use(express.json());

async function handleEnhance(req, res) {
  try {
    const articleId = req.params.id || null;
    console.log('Fetching article...');
    const article = await getLatestArticle(articleId);
    console.log('Fetched article:', article.title);

    console.log('Searching Google...');
    const links = await searchGoogle(article.title);
    console.log('Top Google links:', links);

    const references = [];
    for (const link of links) {
      console.log('Scraping:', link);
      const content = await scrapeArticle(link);
      references.push(content);
    }

    console.log('Rewriting article...');
    const enhancedContent = await rewriteArticle(article.content, references);

    console.log('Publishing article...');
    await publishArticle(article.id, enhancedContent);

    console.log('Enhancement done!');
    res.json({ success: true, message: 'Article enhanced successfully!' });
  } catch (err) {
    console.error('Enhancement error:', err);
    res.status(500).json({ success: false, message: 'Enhancement failed.', error: err.message });
  }
}


app.post('/enhance', handleEnhance);      
app.post('/enhance/:id', handleEnhance);   


app.listen(process.env.PORT, () => {
  console.log(`Node processor running on http://localhost:${process.env.PORT}`);
});
