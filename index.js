'use strict';

const app = require('./lib/app');
require( './lib/setup-mongoose' );

const port = process.env.PORT || 3000;

app.listen(port);

console.log('Server running on', port);
