'use strict';

let mongoose            = require( 'mongoose' );
let RestaurantSchema    = require( './schemas/restaurant.js' );
let NeighbourhoodSchema = require( './schemas/neighbourhood.js' );


function test( mongoose ) {
	console.log( 'Instantiating models' );

	// let Restaurant    = mongoose.model( 'restaurant', RestaurantSchema );
	let Neighbourhood = mongoose.model( 'neighbourhood', NeighbourhoodSchema );
	let Restaurant    = mongoose.model( 'restaurant', RestaurantSchema );

	return function query( callback ) {
		let r = Restaurant.findOne( ).then( console.log ).catch( console.error );
		let n = Neighbourhood.findOne( ).then( console.log ).catch( console.error );

		let FakedLocation = {
			type: "Point",
			coordinates: [ -73.93414657, 40.82302903 ]
		};


		// Find the neighbourhood the user on FakedLocation is in
		Neighbourhood.findOne({
			geometry: {
				$geoIntersects: {
					$geometry: FakedLocation
				}
			}
		}).then( callback ).catch( console.error );
	};
};

function boot( config ) {
	return test( mongoose )( console.log );
}

function halt() {
	// noop
}


module.exports.boot = boot;
module.exports.halt = halt;
