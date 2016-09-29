'use strict';

const DB   = require( '../db.js' );
const data = require( '../data.json' );

let db = DB( { db: data } );

// Init
console.assert( Object.keys( data ).length === 3, 'Dataset starts with 3 items' );

// Save
const stub = { 'XX-TJ-80': { description: "Mini Cooper S" } };
const key  = Object.keys( stub )[0];

let save = db.save( key, stub[ key ] );
console.assert( Object.keys( data ).length === 4, 'Dataset now is 4 items' );
console.assert( save === stub[ key ], 'db.save should return the data' );

// Get
console.assert( db.get( key ) === stub[ key ], 'Able to retrieve data from the store' );

// Delete
let del = db.delete( 'XX-TJ-80' );
console.assert( del, 'Delete an item' );
console.assert( Object.keys( data ).length === 3 );
