'use strict';

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	// "type" : String,
    "geometry" : {
        "coordinates" : [ mongoose.Schema.Types.Mixed ]
    },
    "name" : String
});

// {
//     "_id" : ObjectId("55cb9c666c522cafdb053a68"),
//     "geometry" : {
//         "type" : "Polygon",
//         "coordinates" : [
//             [
//                 [
//                     -73.93383000695911,
//                     40.81949109558767
//                 ],
//                 ...
//             ]
//         ]
//     },
//     "name" : "Central Harlem North-Polo Grounds"
// }
