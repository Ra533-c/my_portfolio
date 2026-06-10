const mongoose = require('mongoose');

const SilverSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Silver', SilverSchema);
