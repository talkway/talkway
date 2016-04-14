'use strict';

let mongoose = require( 'mongoose' );

let Restaurant = mongoose.Schema( {
	name: String
} );

module.exports = Restaurant;

// {
//    location: {
//       type: "Point",
//       coordinates: [-73.856077, 40.848447]
//    },
//    name: "Morris Park Bake Shop"
// }
