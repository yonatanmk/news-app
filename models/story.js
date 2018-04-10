const mongoose = require('mongoose');

const { Schema } = mongoose;

const storySchema = new Schema({
  _id: String,
  title: String,
  description: String,
  publishedAt: String,
  urlToImage: String,
  url: String,
  source: {
    id: String,
    name: String,
  },
});

mongoose.model('stories', storySchema);
