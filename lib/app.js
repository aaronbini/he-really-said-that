'use strict';

const express = require('express');
const errorHandler = require('./error-handler');
const notFound = require('./not-found');
const app = express();
const path = require( 'path' );
const publicPath = path.resolve( __dirname, '../public' );
const indexHtml = path.resolve( __dirname, '../public/index.html' );

app

.use(express.static(publicPath))

.get('/*', function (req,res) {
  res.sendFile(indexHtml);
})

.use(errorHandler)

.use(notFound);

module.exports = app;
