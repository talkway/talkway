'use strict';

// Stubs
var Message = {
	id: 1,
	user: {
		id: 1,
		name: "Garbrand"
	},
	data: "Hello, World!",
	metadata: null
}

var MessageList = [];

MessageList.push( Message );


// View
function MessageListView ( data ) {
	
	return data.map( createChild ).join('');

	function createChild ( el ) {
		// TODO: add Babel or Webpack so we can use sweet sweet ES6 in the browser.
		// return `<dt class="user">el.user.name</dt><dd class="message">el.data</dd>`;
		return '<dt class="user">' + el.user.name + '</dt><dd class="message">' + el.data + '</dd>';
	}
}



// Controller
function MessageController () {
	var el = document.querySelector( '.message.list' );
	el.innerHTML = MessageListView( MessageList );
}

// Simulate incoming message
setTimeout( MessageController, Math.random() * 5 * 1000 );
