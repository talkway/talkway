'use strict';

// Controller for the Talkway Application

// Vendor modules
const shoe      = require( 'shoe' );

// Datasources
let messages    = require( './messages.js' );

// Components -- inject DS into components?
let locator     = require( './locator.js' );
let speech      = require( './speech.js' );
let talk        = require( './talk.js' );
let message     = require( './message.js' )( messages );
let messagelist = require( './messagelist.js' )( messages );

// Streams
const server$   = shoe( '/socket' );

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

// TODO: Remove this quick and dirty state sharing hack
window.talkway = {};
window.talkway.user = {
	id: Math.floor( Math.random * 10000000 ),
	name: "Guest"
}

// Simulate incoming message
setTimeout( () => messages.push( Message ), Math.random() * 5 * 1000 );

// Echo messages (very annoying)
// TODO: move writing to the stream into the datasource
function echo( datasource, data ) {
	if (data.user.id !== 1) {
		let msg = Object.assign( {}, Message );

		msg.data = "Yes, "+ data.data + "!";

		setTimeout( stream( msg ) , Math.random() * 2 * 1000 );
	}

	function stream( message ) {
		let msg = { event: "message", data: message };
		server$.write( JSON.stringify( msg ) );
		datasource.push( message );
	}
}

messages.subscribe( echo );

// Activate speech recognition
speech( server$ );
talk( server$ );
