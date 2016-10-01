'use strict';

const _       = require( 'highland' );
const shoe    = require( 'shoe' );
const server  = require( './server/index.js' );

const port    = 8080;

const registration$ = _().map( JSON.parse ).pipe( process.stdout );

// Create the socket
let estimationSocket = shoe( function ( stream /* SocketJS stream */ ) {
	stream.pipe( registration$ );
});

estimationSocket.install( server, '/register');

server.listen( port );

console.log( `Server listening on http://localhost:${port}` );
