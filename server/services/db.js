'use strict';

const mongoose = require( 'mongoose' );
const db       = mongoose.connection;

function boot( config ) {
	// Event handlers
	mongoose.connection.on('error', console.error );
	mongoose.connection.once('connection', console.log );

	// For consistency, mongoose is wrapped in a Promise.
	return new Promise( ( resolve, reject ) => {
		mongoose.connect( config.uri );

		// resolve
		db.once( 'open', () => {
			console.log( 'Connected to database: %s', config.uri );
			resolve( mongoose );
		});

		// reject
		db.on( 'error', reject );
	});
}

function halt( config ) {
	let uri = config && config.uri;
	return db.close( uri );
}


module.exports.boot = boot;
