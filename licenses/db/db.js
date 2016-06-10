'use strict';

module.exports = function persistence( options ) {
	options = options || {};
	let db = options.db || require( './data.json' );

	const api = {
		save  : ( key, data ) => db[ key ] = data,
		get   : ( key ) => db[ key ],
		delete: ( key ) => delete db[ key ]
	}

	return api;
}
