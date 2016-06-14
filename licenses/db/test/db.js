'use strict';

const DB   = require( '../db.js' );
const data = require( '../data.json' );

let db = DB( { db: data } );

// Init
console.assert( Object.keys( data ).length === 3, 'Dataset starts with 3 items' );

// Save
let save = db.save( 'XX-TJ-80', "Mini Cooper S" );
console.assert( Object.keys( data ).length === 4, 'Dataset now is 4 items' );
console.assert( save === "Mini Cooper S", 'db.save should return the data' );

// Get
let get = db.get( 'XX-TJ-80' );
console.assert( get === "Mini Cooper S" );

// Delete
let del = db.delete( 'XX-TJ-80' );
console.assert( del );
console.assert( Object.keys( data ).length === 3 );
