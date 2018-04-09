const keys = require('../config/keys');
const rp = require('request-promise');

module.exports = app => {
  app.get('/stories', (req, res) => {
    const url = 'https://newsapi.org/v2/top-headlines?' +
      'sources=bbc-news,' +
      `apiKey=${keys.apiKey}`;

    rp(url)
      .then(body => res.send(body));
	});
};
