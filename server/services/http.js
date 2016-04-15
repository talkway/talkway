'use strict';

let file   = ( __filename ).replace( process.cwd(), '' );

let koa    = require( 'koa' );
let serve  = require( 'koa-static' );
let http   = require( 'http' );
let Primus = require( 'primus' );
let ws     = require( 'ws' );
let fs     = require( 'fs' );
let path   = require( 'path' );

function boot( config ) {
	let port = config && config.port || 8080;

	let server = createServer( config );
	let socket = attachWebsocket( server );

	// Activate shortcut to primus build folder:
	socket.library();

	// Attach generic logging handler to events
	let events = [ 'data', 'open', 'close', 'connection', 'disconnection', 'reconnection'];
	events.forEach( ( event ) => socket.on( event, ( data ) => console.log ) );

	socket.on('error', ( error ) => console.error( "Websocket Error:", error ) );

	// Connection callback
	socket.on('connection', ( stream ) => stream.write( file, 'MESSAGE FROM SERVER') );

	console.log( `http server listening on port ${port}` );
	return server.listen( port );
}


function createServer( config ) {
	let app  = koa();
	let root = config && config.dir || __dirname + '/../../client';

	console.log( "http: serving static assets from: ", root );

	app.use( require( 'koa-logger' )( ) );
	app.use( serve( root ) );

	let server = http.createServer( app.callback() );

	return server;
}

function attachWebsocket( server ) {
	let socket = new Primus( server, {
		transformer       : 'websockets',
		iknowhttpsisbetter: true
	} );

	console.log( "Webocket created: ", socket.constructor.name );

	return socket;
}

module.exports.boot = boot;
