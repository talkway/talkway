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

// Echo messages (very annoying ¯\_(ツ)_/¯ )
function echo( datasource, data ) {
	if (data.user.id !== 1) {
		let msg = Object.assign( {}, Message );

		msg.data = "Yes, "+ data.data + "!";

		setTimeout( () => datasource.push( msg ), Math.random() * 2 * 1000 );
	}
}

// TODO: move to a transport service
let Primus = window.Primus;

window.socket = Primus.connect( { url: "http://localhost:8080/" });

socket.on('open', ( data ) => {
	console.log( 'open' );
	socket.write( 'Hello from the client!' );
} );

socket.on('data', ( data ) => console.log( data ) );
socket.on('error', ( data ) => console.error( data ) );


messages.subscribe( echo );
