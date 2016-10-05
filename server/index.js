'use strict';

// Round: duplex stream
// input: stream of Items
// output:
	// readable: presentation stream
	// writable: estimation stream (estimation value for player

let protocol = require( 'https' );
let fs       = require( 'fs' );
let ecstatic = require( 'ecstatic' )( __dirname + '/../static' );

let options = {
	key:  fs.readFileSync( `${__dirname}/../operations/key.pem` ),
	cert: fs.readFileSync( `${__dirname}/../operations/cert.pem` )
};

let server = protocol.createServer( options, ecstatic );

module.exports = server;
