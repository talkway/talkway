'use strict';

module.exports = function DataSourceFactory() {
	// DataSourceFactory extends Array, and wraps 'push' so it can be used for pub/sub.
	let array = new Array( ...arguments );

	// Mixing in custom methods
	Object.defineProperties( array, {
		'push': {
			enumerable: false,
			value: (data) => {
				console.log( 'Pushed %o to datasource', data );

				// Add data to the datasource
				Array.prototype.push.call( array, data );

				// Call each subscriber with data & array
				array.__subscribers.forEach( (fn) => fn( array, data ) );
			}
		},
		'subscribe': {
			enumerable: false,
			value: ( fn ) => {
				array.__subscribers.push( fn );
			}
		},
		'__subscribers': {
			enumerable: false,
			value: []
		}
	});

	return array;
}
