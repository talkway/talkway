'use strict';

const _          = require( 'highland' );
const shoe       = require( 'shoe' );
const JSON$      = require( 'JSONStream' );

const server     = require( './server/index.js' );
const test$      = require( './server/dispatcher.js');

const port       = process.env.PORT || 8080;

const client$    = _().errors( (error, push) => console.log( 'ERROR in client$', error ) );

const register$  = client$.fork().where( { event: "register" } ).each( _.log );
const message$   = client$.fork().where( { event: "message" } ).each( _.log );

// Create the socket
let estimationSocket = shoe( function ( stream /* SocketJS stream */ ) {
	stream.pipe( JSON$.parse() ).pipe( client$ );

	// test$.fork().pipe( stream ); // Pipe test messages to the stream
});

// Pipe test messages to the stream
// test$.pipe( client$ );

estimationSocket.install( server, '/socket');

server.listen( port );

console.log( `Server listening on http://localhost:${port}` );
