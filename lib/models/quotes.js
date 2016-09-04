const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quote = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  summary: {
    type: String
  },
  audioPath: {
    type: String
  }
}, {
  timestamps: true
} );

Quote.statics.getRandom = function() {
  this
    .find({})
    .lean()
  .then( function(quotes) {
    const total = quotes.length - 1;
    const random = Math.floor(Math.random() * total);
    return quotes[random];
  });
};

module.exports = mongoose.model('Quote', Quote);
