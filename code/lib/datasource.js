'use strict';

module.exports = function DataSourceFactory() {
	// DataSourceFactory extends Array, and wraps 'push' so it can be used for pub/sub.
	let array = new Array( ...arguments );
	let subscribers = [];

	// Mixing in custom methods
	Object.defineProperties( array, {
		'push': {
			enumerable: false,
			value: (data) => {
				console.log( 'Pushed %o to datasource', data );

				// Add data to the datasource
				Array.prototype.push.call( array, data );

				// Call each subscriber with data & array
				subscribers.forEach( (fn) => fn( array, data ) );
			}
		},
		'subscribe': {
			enumerable: false,
			value: ( fn ) => {
				subscribers.push( fn );
			}
		}
	});

	return array;
}
