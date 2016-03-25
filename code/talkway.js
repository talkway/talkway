'use strict';

// Controller for the Talkway Application

// Datasources
let messages    = require( './messages.js' );

// Components -- inject DS into components?
let locator     = require( './locator.js' );
let message     = require( './message.js' )( messages );
let messagelist = require( './messagelist.js' )( messages );

// Stub
let User = {
	id: 1,
	name: "Garbrand"
}

let Message = {
	id: 1,
	user: User,
	data: "Hello, World!",
	metadata: null
}

// Simulate incoming message
setTimeout( () => messages.push( Message ), Math.random() * 5 * 1000 );


function echo( datasource, data ) {
	if (data.user.id !== 1) {
		let msg = {};

		Object.assign( msg, data );

		msg.user = User;
		msg.data = "Yes, "+ data.data + "!";

		datasource.push( msg );
	}

	console.log( datasource );
}

messages.subscribe( echo );
