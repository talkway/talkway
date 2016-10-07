'use strict';

// DOCS: https://dev.socrata.com/foundry/opendata.rdw.nl/m9d7-ebf2
// API endpoint: https://opendata.rdw.nl/resource/m9d7-ebf2.json
// Example query: https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=19KRB7

const https = require('https');

function parse( license ) {
	// strip any non-word character
	return license.replace(/[^\w]/g, '');
}

// console.assert( parse( '19-KRB-7')  == '19KRB7' );
// console.assert( parse( '19 KRB 7')  == '19KRB7' );


function get( license ) {
	// An object of options to indicate where to post to
	let options = {
		host  : 'opendata.rdw.nl',
		port  : '443',
		path  : `/resource/m9d7-ebf2.json?kenteken=${license}`,
		method: 'GET'
	};

	// Set up the request
	let req = https.request( options, function( res ) {
		res.setEncoding( 'utf8' );
		// instead of setting a listener, return a stream. Then consume it with res.read();
		// https://nodejs.org/api/stream.html

		res.pipe( process.stdout );
		// _output( res );
	});

	// Consume the stream
	req.end();
}

// let _output = _.map( parse ).map( format ).pipe( process.stdout );
//
// function format( object ) {
// 	return JSON.stringify( object, null, 2 );
// }
//
// function parse( string ) {
// 	return JSON.parse( string );
// }

get( parse( '19-KRB-7' ) );
