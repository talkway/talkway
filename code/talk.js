'use strict';

module.exports = TalkController;

const SpeechRecognition = require( './lib/speechrecognition.js' );
const messages          = require( './messages.js' );

function TalkController( server$ /* Stream */) {
	// View components
	const $record   = document.getElementById( 'record' );
	const label     = $record.textContent;

	// Hook up recognition events
	const recognition = SpeechRecognition();

	recognition.onend = function() {
		$record.removeAttribute( 'disabled' );
		$record.textContent = label;
	};

	recognition.onresult = function() {
		let result  = event.results[0][0].transcript;
		let message = { event: 'message', data: result, user: window.talkway.user };

		// Update the View
		// TODO: Render message to list
		$record.setAttribute( 'disabled', true );

		// Write the `message` as a String to the `server$::Stream`
		server$.write( JSON.stringify( message ) );
		messages.push( message );
	};

	// Hook up
	$record.addEventListener( "click", function( event ) {
		event.preventDefault();
		recognition.start();
		$record.textContent = 'Recording...';
	});
}
