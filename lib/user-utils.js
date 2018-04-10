const mongoose = require('mongoose');

const Story = mongoose.model('stories');

module.exports = {
  getFrontEndUser(user) {
    if (!user) {
      return;
    }
    const { _id, googleId, storyIds } = user;
    return Story.find({ _id: { $in: user.stories } })
      .then(stories => {
        return {
          _id,
          googleId,
          storyIds: user.stories,
          stories,
        }
      });
  }

}
