'use strict';

const express = require('express');
const router = express.Router();

const Quotes = require('../models/quotes');

router
.get('', function (req,res,next) {
  Quotes.getRandom()
    .then(function(quote) {
      res.send(quote);
    })
    .catch(next);
})
.get('/all', function (req, res, next) {
  Quotes.find({})
  .lean()
  .then(function(quotes) {
    res.send(quotes);
  })
  .catch(next);
});

module.exports = router;
