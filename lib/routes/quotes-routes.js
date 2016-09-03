'use strict';

const express = require('express');
const router = express.Router();

const Quotes = require('../models/quotes');

router
.get('', (req,res,next) => {
  Quotes.getRandom()
    .then(quote => {
      res.send(quote);
    })
    .catch(next);
})
.get('/all', (req, res, next) => {
  Quotes.find({})
  .lean()
  .then(quotes => {
    res.send(quotes);
  })
  .catch(next);
});

module.exports = router;
