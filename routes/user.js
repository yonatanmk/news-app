const { getFrontEndUser } = require('../lib/user-utils');

module.exports = app => {
  app.get('/api/current-user', (req, res) => {
    const { user } = req;
    if (!user) {
      res.send();
    } else {
      getFrontEndUser(user)
      .then(newUser => {
        res.send(newUser);
      })
      .catch(() => {
        console.log('Error Getting Front End User: /api/current-user')
        res.status(500).send();
      });
    }
  });
};
