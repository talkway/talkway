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
	var el = document.createElement ( 'dl' );

	(el.classList) ? el.classList.add('message', 'list') : el.className += ' ' + 'message list';

	var fragment = data.map( createChild ).join('');
	el.innerHTML = fragment;

	return el;

	function createChild ( el ) {
		// TODO: add Babel or Webpack so we can use sweet sweet ES6 in the browser.
		// return `<dt class="user">el.user.name</dt><dd class="message">el.data</dd>`;
		return '<dt class="user">' + el.user.name + '</dt><dd class="message">' + el.data + '</dd>';
	}
}



// Controller
function MessageController () {
	var List = MessageListView( MessageList );
	document.getElementsByTagName('body')[0].appendChild( List );
}

// Simulate incoming message
setTimeout( MessageController, Math.random() * 5 * 1000 );
