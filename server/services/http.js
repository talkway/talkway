'use strict';

let koa    = require( 'koa' );
let Primus = require( 'primus' );
let ws     = require( 'ws' );
let fs     = require( 'fs' );
let path   = require( 'path' );

function boot( config ) {
	let port = config && config.port || 8080;

	let server = createServer( config );
	let socket = attachWebsocket( server );

	// Attach generic logging handler to events
	let events = [ 'data', 'open', 'close', 'connection', 'disconnection', 'reconnection'];
	events.forEach( ( event ) => socket.on( event, ( data ) => console.log ) );

	socket.on('error', ( error ) => console.error( "Websocket Error:", error ) );

	// Connection callback
	socket.on('connection', ( stream ) => stream.write('test') );

	console.log( `http server listening on port ${port}` );
	return server.listen( port );
}


function createServer( config ) {
	let app  = koa();
	let root = config && config.dir || __dirname + '/../client';
	let opts = { index: "index.html" };

	app.use( require( 'koa-logger' )( ) );
	app.use( require( 'koa-static' )( root , opts ) );

	return app;
}

function attachWebsocket( server ) {
	let socket = new Primus( server, {
		transformer       : 'websockets',
		iknowhttpsisbetter: true
	} );

	console.log( "Websocket created: ", socket.constructor.name );

	return socket;
}

boot();

module.exports.boot = boot;
