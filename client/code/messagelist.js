'use strict';

// View
function MessageListView ( data ) {

	function createChild ( el ) {
		// return `<dt class="message">el.data</dt><dd class="user">el.user.name</dd>`;
		return '<dt class="message">' + el.data + '</dt><dd class="user">' + el.user.name + '</dd>';
	}

	return data.map( createChild ).join('');
}

// Controller
function MessageController ( datasource ) {
	let el = document.querySelector( '.message.list' );
	el.innerHTML = MessageListView( datasource );

	datasource.subscribe( MessageController );
}

module.exports = MessageController;
