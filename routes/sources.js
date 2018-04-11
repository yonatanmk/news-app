const _ = require('lodash');
const mongoose = require('mongoose');
const rp = require('request-promise');
const keys = require('../config/keys');
const { getFrontEndUser } = require('../lib/user-utils');

const User = mongoose.model('users');

// const VALID_SOURCES = ['bbc-news', 'abc-news', 'cbs-news', 'the-new-york-times', 'nbc-news'];

module.exports = app => {
  app.get('/api/source-list', (req, res) => {
    const userSources = _.get(req, 'user.sources')

    const url = 'https://newsapi.org/v2/sources?' +
      `apiKey=${keys.apiKey}`;

    rp(url)
      .then(body => {
        const sources = JSON.parse(body)
          .sources.filter(source => {
            if (userSources.length === 5) {
              return userSources.includes(source.id)
            } else {
              return true;
            }
          });
          console.log(sources)
        res.send(sources);
      });
	});

  app.post('/api/set-user-sources', (req, res) => {
    const { body, user } = req;
    const { sources } = body;
    return User.findById({ _id: user._id })
      .then(dbUser => {
        if (!sources) {
          res.send(dbUser);
        }
        dbUser.sources = sources;
        return dbUser;
      })
      .then(dbUser => dbUser.save())
      .then(newUser => getFrontEndUser(newUser))
      .then(_user => res.send(_user))
      .catch(err => {
        console.log('ERROR');
        console.log(err.error);
      });
  });
};
