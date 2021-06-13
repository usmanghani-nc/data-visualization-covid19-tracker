const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = async (fetchHtml) => {
  const webpage = await axios.get(fetchHtml);

  return cheerio.load(webpage.data);
};

const loadingScript = async () => {
  const $ = await fetchData('https://www.who.int/');

  const list = [];

  $('.list-view .list-view--item').each((index, element) => {
    list.push({
      link: 'https://www.who.int/' + $(element).find('a').attr('href'),
      title: $(element).find('a .info .heading').text(),
      date: $(element).find('a .timestamp').text().trim(),
    });
  });

  return list;
};

export default async function handler(req, res) {
  try {
    const data = await loadingScript();

    res.json(data);
  } catch (e) {
    res.json({ error: e.message });
  }
}
