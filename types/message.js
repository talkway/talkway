'use strict';

let User = require( './user.js' );

let Message = {
	id:       Number,
	user:     User,
	data:     String,
	metadata: Object
}

module.exports = Message;
