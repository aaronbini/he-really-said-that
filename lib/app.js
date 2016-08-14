'use strict';

const express = require('express');
const errorHandler = require('./error-handler');
const notFound = require('./not-found');
const quotes = require('./routes/quotes-routes');
const app = express();
const path = require( 'path' );
const publicPath = path.resolve( __dirname, '../public' );
const indexHtml = path.resolve( __dirname, '../index.html' );

const publicPath = path.resolve(__dirname, '../public');

app

.get('/', (req,res) => res.sendFile(indexHtml))

.use(express.static(publicPath))

.use('/quotes', quotes)

.use(errorHandler)

.use(notFound);

module.exports = app;
