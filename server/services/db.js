'use strict';

const mongoose = require( 'mongoose' );
const db       = mongoose.connection;

function boot( config ) {
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


module.exports.boot = boot;
