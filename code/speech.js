'use strict';

// TODO: rename to register.js

module.exports = RegisterController;

const SpeechRecognition = require( './lib/speechrecognition.js' );

function RegisterController( server$ /* Stream */) {

	// View components
	const $callsign = document.getElementById( 'callsign' );
	const $register = document.getElementById( 'register' );
	const $record   = document.getElementById( 'record' );

	// Hook up recognition events
	const recognition = SpeechRecognition();

	recognition.onend = function() {
		$register.textContent = 'Name set';
		$register.setAttribute( 'disabled', true );
	};

	recognition.onresult = function() {
		let result  = event.results[0][0].transcript;
		let message = { event: 'register', data: result };

		// TODO: remove this state sharing
		window.talkway.user.name = result;

		// Update the View
		$callsign.textContent = result;
		$record.removeAttribute( 'disabled' );

		// Write the `message` as a String to the `server$::Stream`
		server$.write( JSON.stringify( message ) );;
	};

	// Hook up
	$register.addEventListener( "click", function( event ) {
		event.preventDefault();
		recognition.start();
		$register.textContent = 'Recording...';
	});
}
