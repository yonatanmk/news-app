const keys = require('../config/keys');
const rp = require('request-promise');

const VALID_SOURCES = ['bbc-news', 'abc-news', 'cbs-news', 'the-new-york-times', 'nbc-news'];

module.exports = app => {
  app.get('/api/source-list', (req, res) => {
    const url = 'https://newsapi.org/v2/sources?' +
      `apiKey=${keys.apiKey}`;

    rp(url)
      .then(body => {
        const sources = JSON.parse(body)
          .sources.filter(source => VALID_SOURCES.includes(source.id));
        res.send(sources);
      });
	});
};
