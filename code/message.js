'use strict';

// Types
var User = {
	id:   Number,
	name: String
}

var Message = {
	id:       Number,
	user:     User,
	data:     String,
	metadata: Object
}


function controller ( ) {
	// when 'submit' is clicked, parse the form, create a message, push it to the message list (for now)
	var form = document.getElementById('Talkway');
	form.addEventListener( 'submit', formHandler );
}

function formHandler( event ) {
	event.preventDefault();
	var message = createMessage ( { message: event.target.elements[0].value } );

	// TODO: take this out...
	MessageList.push( message );
	MessageController( MessageList );
}


function createMessage ( data ) {
	// Create a message type from the defined structure
	var message = Object.assign( {}, Message );

	// Populate the message type (we can later check against the structure)
	message.id       = Math.random();
	message.user     = { id: 0, name: "You" };
	message.data     = data.message;
	message.metadata = null;

	return message;
}


controller();
