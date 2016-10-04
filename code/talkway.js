'use strict';

// Controller for the Talkway Application

// Datasources
let messages    = require( './messages.js' );

// Components -- inject DS into components?
let locator     = require( './locator.js' );
let speech      = require( './speech.js' );
let message     = require( './message.js' )( messages );
let messagelist = require( './messagelist.js' )( messages );

// Stub
let User = {
	id: 1,
	name: "Echo Bot"
}

let Message = {
	id: 1,
	user: User,
	data: "Hello, World!",
	metadata: null
}

// Simulate incoming message
setTimeout( () => messages.push( Message ), Math.random() * 5 * 1000 );

// Echo messages (very annoying)
function echo( datasource, data ) {
	if (data.user.id !== 1) {
		let msg = Object.assign( {}, Message );

		msg.data = "Yes, "+ data.data + "!";

		setTimeout( () => datasource.push( msg ), Math.random() * 2 * 1000 );
	}
}

messages.subscribe( echo );


// Activate speech recognition
speech( );
