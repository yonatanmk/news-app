const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user');
require('./services/passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth');
const sourceRoutes = require('./routes/sources');
const storiesRoutes = require('./routes/stories');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey],
	}),
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
sourceRoutes(app);
storiesRoutes(app);


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; // lets heroku declare which port our app will use, default of 5000
app.listen(PORT);
