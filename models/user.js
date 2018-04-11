const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  stories: [String],
  sources: [String],
});

mongoose.model('users', userSchema);
