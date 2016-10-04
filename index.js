'use strict';

const _          = require( 'highland' );
const shoe       = require( 'shoe' );

const server     = require( './server/index.js' );
const test$      = require( './server/dispatcher.js');

const port       = 8080;

const client$    = _().map( JSON.parse );

const register$  = client$.fork().where( { event: "register" } ).each( _.log );
const message$   = client$.fork().where( { event: "message" } ).each( _.log );

// Create the socket
let estimationSocket = shoe( function ( stream /* SocketJS stream */ ) {
	stream.pipe( client$ );

	// test$.observe().pipe( stream ); // Pipe test messages to the stream
});

// Pipe test messages to the stream
// test$.pipe( client$ );

estimationSocket.install( server, '/register');

server.listen( port );

console.log( `Server listening on http://localhost:${port}` );
