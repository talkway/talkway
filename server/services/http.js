'use strict';

let http = require( 'http' );
// let primus = require( 'primus' );
// let ws     = require( 'ws' );

function boot( config ) {
	let port = config && config.port || 8080;

	// return a http server (TODO: with ws attached)
	let server = http.createServer( (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
  		res.end('okay');
	} );

	console.log( `http server listening on port ${port}` );

	return server.listen( port );
}

module.exports.boot = boot;
