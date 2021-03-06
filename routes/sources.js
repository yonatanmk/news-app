const _ = require('lodash');
const mongoose = require('mongoose');
const rp = require('request-promise');
const keys = require('../config/keys');
const { getFrontEndUser } = require('../lib/user-utils');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/source-list', (req, res) => {
    const userSources = _.get(req, 'user.sources');

    const url = 'https://newsapi.org/v2/sources?' +
      `apiKey=${keys.apiKey}`;

    rp(url)
      .then(body => {
        const sources = JSON.parse(body)
          .sources.filter(source => {
            if (userSources.length === 5) {
              return userSources && userSources.includes(source.id);
            }
            return true;
          });
        res.send(sources);
      })
      .catch(() => {
        console.log('Error Getting News Sources: /api/source-list');
        res.status(500).send();
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
      .catch(() => {
        console.log('Error Saving News Sources: /api/set-user-sources');
        res.status(500).send();
      });
  });
};
