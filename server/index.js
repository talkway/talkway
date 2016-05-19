'use strict';

let db          = require( './services/db.js' );
let http        = require( './services/http.js' );
let persistence = require( './services/persistence.js' );

let config = [
	{
		service: db,
		name   : 'db',
		config : { uri: 'mongodb://localhost/talkway' }
	}, {
		service: http,
		name   : 'http',
		config : { port: 8080 }
	}, {
		service: persistence,
		name   : 'persistence',
		config : {}
	}
];

function compose( services ) {
	// 1. Create an array/object of promises representing all services
	// 2. When all services boot/resolve successfully, init
	// 3. Otherwise, throw error and crash.
	// return services.map( ( s ) => s.service.boot( s.config || null ) );
	return services.map( ( s ) => s.service.boot( s.config || null ) );

	// Returns an Array of Promises
}

function boot( server ) {
	return Promise.all( server )
		.then( ( value ) => console.log( 'All services booted' ) )
	;
}

function errorHandler( error ) {
	console.error( 'Crashing server on error:' );
	console.error( error );

	// const halt = server.map( ( service ) => service.halt() );
	// TODO: change to a programmatic approach (define service API)


	process.exit( 1 );
}

process.on('uncaughtException', errorHandler );

const server = compose( config );

boot( server ).catch( errorHandler );
