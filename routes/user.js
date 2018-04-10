const mongoose = require('mongoose');
const { getFrontEndUser } = require('../lib/user-utils');

const Story = mongoose.model('stories');

module.exports = app => {
  app.get('/api/current-user', (req, res) => {
    const { user } = req;
    if (!user) {
      res.send();
    }
    getFrontEndUser(user)
      .then(newUser => {
        res.send(newUser);
      })
  });
};
