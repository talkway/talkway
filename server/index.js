'use strict';

// Round: duplex stream
// input: stream of Items
// output:
	// readable: presentation stream
	// writable: estimation stream (estimation value for player

let http     = require( 'http' );
let fs       = require( 'fs' );
let ecstatic = require( 'ecstatic' )( __dirname + '/../static' );


let server = http.createServer( ecstatic );

module.exports = server;
