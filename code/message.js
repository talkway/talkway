'use strict';

// Types
// TODO: require these from types repo
let User = {
	id:   Number,
	name: String
}

let Message = {
	id:       Number,
	user:     User,
	data:     String,
	metadata: Object
}

let datasource;

function controller ( ds ) {
	// when 'submit' is clicked, parse the form, create a message, push it to the datasource (for now)
	let form = document.getElementById('Talkway');
	form.addEventListener( 'submit', formHandler );

	datasource = ds;
}

function formHandler( event ) {
	event.preventDefault();
	let message = createMessage ( { message: event.target.elements[0].value } );

	datasource.push( message );
}


function createMessage ( data ) {
	// Create a message type from the defined structure
	let message = Object.assign( {}, Message );

	// Populate the message type (we can later check against the structure)
	message.id       = Math.random();
	message.user     = { id: 0, name: "You" };
	message.data     = data.message;
	message.metadata = null;

	return message;
}


module.exports = controller;
