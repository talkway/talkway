'use strict';

let mongoose            = require( 'mongoose' );
let RestaurantSchema    = require( './schemas/restaurant.js' );
let NeighbourhoodSchema = require( './schemas/neighbourhood.js' );


mongoose.connect('mongodb://localhost/test').then( boot ).catch( (error) => console.error( error ) );
mongoose.connection.on('error', console.error );
mongoose.connection.once('connection', console.log );

function boot() {
	console.log( 'Instantiating models' );

	let Restaurant    = mongoose.model( 'restaurant', RestaurantSchema );
	let Neighbourhood = mongoose.model( 'neighbourhood', NeighbourhoodSchema );

	let r = Restaurant.findOne( ).then( console.log ).catch( console.error );
	let n = Neighbourhood.findOne( ).then( console.log ).catch( console.error );

	let FakedLocation = {
		type: "Point",
		coordinates: [ -73.93414657, 40.82302903 ]
	};

	// Find the neighbourhood the user is in
	Neighbourhood.findOne({
		geometry: {
			$geoIntersects: {
				$geometry: FakedLocation
			}
		}
	}).then( console.log ).catch( console.error );
}
