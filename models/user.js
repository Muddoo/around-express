const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(www\.)?[\w\]\[\/.~:?%#@!$&'()*+,;=-]+\..+/.test(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

module.exports = mongoose.model('user', schema);
