const mongoose = require('mongoose');

const Story = mongoose.model('stories');

module.exports = {
  getFrontEndUser(user) {
    if (!user) {
      console.log('no user in getFrontEndUser');
      return Promise.resolve();
    }
    const { _id, googleId, sources } = user;
    return Story.find({ _id: { $in: user.stories } })
      .then(stories => {
        return {
          _id,
          googleId,
          storyIds: user.stories,
          stories,
          sources,
        };
      });
  },
};
