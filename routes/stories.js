const keys = require('../config/keys');
const rp = require('request-promise');

module.exports = app => {
  app.post('/api/stories', (req, res) => {
    const { body } = req;
    const url = 'https://newsapi.org/v2/top-headlines' +
      `?sources=${body.sourceId}` +
      `&apiKey=${keys.apiKey}`;

    rp(url)
      .then(_body => res.send(_body));
	});
};
