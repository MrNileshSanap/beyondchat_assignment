const puppeteer = require('puppeteer');

async function searchGoogle(title) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const query = encodeURIComponent(title);
  await page.goto(`https://www.google.com/search?q=${query}`, { waitUntil: 'networkidle2' });

  const links = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('a').forEach(a => {
      if (a.href.startsWith('http') && !a.href.includes('google')) results.push(a.href);
    });
    return results;
  });

  await browser.close();

  return links.slice(0, 2); // Take top 2 links
}

module.exports = searchGoogle;
