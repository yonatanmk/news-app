const { getFrontEndUser } = require('../lib/user-utils');

module.exports = app => {
  app.get('/api/current-user', (req, res) => {
    const { user } = req;
    if (!user) {
      res.send();
    }
    getFrontEndUser(user)
      .then(newUser => {
        res.send(newUser);
      });
  });
};
