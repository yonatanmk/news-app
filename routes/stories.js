const mongoose = require('mongoose');
const rp = require('request-promise');
const md5 = require('md5');
const keys = require('../config/keys');
const { createStoryFromApi } = require('../lib/story-utils');

const User = mongoose.model('users');
const Story = mongoose.model('stories');

module.exports = app => {
  app.post('/api/stories', (req, res) => {
    const { body } = req;
    const url = 'https://newsapi.org/v2/top-headlines' +
      `?sources=${body.sourceId}` +
      `&apiKey=${keys.apiKey}`;

    rp(url)
      .then(_body => res.send(_body));
	});

  app.post('/api/add-user-story', (req, res) => {
    const { body, user } = req;
    const { story } = body;
    const storyId = md5(story.publishedAt);
    return User.findById({ _id: user._id })
      .then(dbUser => {
        if (!story || dbUser.stories.includes(storyId)) {
          res.send(dbUser);
        }
        dbUser.stories.push((md5(story.publishedAt)));
        return dbUser;
      })
      .then(dbUser => {
        return Story.findOne({ _id: storyId })
          .then(dbStory => {
            if (dbStory) {
              return dbUser;
            }
            const newStory = createStoryFromApi(story);
            return (new Story(newStory)).save()
              .then(() => {
                console.log(`Saved \"${newStory.title}\"`);
                return dbUser;
              });
          })
      })
      .then(dbUser => {
        return dbUser.save()
          .then(newUser => {
            res.send(newUser)
          })
      })
    .catch(err => {
      console.log('ERROR');
      console.log(err.error);
    })
	});

  app.post('/api/remove-user-story', (req, res) => {
    const { body, user } = req;
    const { publishedAt } = body;
    const storyId = md5(publishedAt);

    return User.findById({ _id: user._id })
      .then(dbUser => {
        const stories = dbUser.stories.filter(story => story !== storyId);
        dbUser.stories = stories;
        return dbUser.save();
      })
      .then(newUser => {
        res.send(newUser);
      })
      .catch(err => {
        console.log('ERROR');
        console.log(err.error);
      })
  });
};
