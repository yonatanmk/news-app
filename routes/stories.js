const mongoose = require('mongoose');
const rp = require('request-promise');
const md5 = require('md5');
const keys = require('../config/keys');
const { createStoryFromApi } = require('../lib/story-utils');
const { getFrontEndUser } = require('../lib/user-utils');

const User = mongoose.model('users');
const Story = mongoose.model('stories');

module.exports = app => {
  app.post('/api/stories', (req, res) => {
    const { body } = req;
    const url = 'https://newsapi.org/v2/top-headlines' +
      `?sources=${body.sourceId}` +
      `&apiKey=${keys.apiKey}`;

    rp(url)
      .then(_body => res.send(_body))
      .catch(() => {
        console.log('Error Getting News Stories: /api/stories');
        res.status(500).send();
      });
	});

  app.post('/api/add-user-story', (req, res) => {
    const { body, user } = req;
    const { story } = body;
    const storyId = md5(story.title);
    return User.findById({ _id: user._id })
      .then(dbUser => {
        if (!story || dbUser.stories.includes(storyId)) {
          res.send(dbUser);
        }
        dbUser.stories.push((md5(story.title)));
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
                console.log(`Saved "${newStory.title}"`);
                return dbUser;
              });
          });
      })
      .then(dbUser => dbUser.save())
      .then(newUser => getFrontEndUser(newUser))
      .then(_user => res.send(_user))
      .catch(() => {
        console.log('Error Saving News Story: /api/add-user-story');
        console.log(story.title);
        res.status(500).send();
      });
	});

  app.post('/api/remove-user-story', (req, res) => {
    const { body, user } = req;
    const { title } = body;
    const storyId = md5(title);

    return User.findById({ _id: user._id })
      .then(dbUser => {
        const stories = dbUser.stories.filter(story => story !== storyId);
        dbUser.stories = stories;
        return dbUser.save();
      })
      .then(newUser => getFrontEndUser(newUser))
      .then(_user => res.send(_user))
      .catch(() => {
        console.log('Error Removing News Story: /api/remove-user-story');
        console.log(title);
        res.status(500).send();
      });
  });
};
