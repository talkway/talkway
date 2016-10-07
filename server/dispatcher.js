'use strict';

let _ = require( 'highland' );
const randomMessage$ = _();
const timeout$ = _();

let messages = [
	{ event: "register", data: "TEST USER", timestamp: Date.now() },
	{ event: "mesage", data: { to: "bold eagle", from: "loose cannon", message: "Roger that!" } }
];


function write( message ) {
	output$.write( JSON.stringify( message ) );
}

function delay() {
	return Math.random() * 1000;
}

function randomMessage( list ) {
	let pick = Math.round( ( Math.random() * (list.length-1) *10 ) / 10 );
	return JSON.stringify( list[ pick ] );
}

function start( ) {
	randomMessage$.write( randomMessage( messages ) );
	timeout$.write( setTimeout( start, delay() ) );
}

start();

// let out = timeout$.each( _.log );

module.exports = randomMessage$;
