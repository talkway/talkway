'use strict';

const shoe = require( 'shoe' );

module.exports = controller;

function SpeechRecognition( debug ) {

	const recognition = new ( webkitSpeechRecognition || SpeechRecognition )();

	recognition.lang            = 'en-US';
	recognition.interimResults  = false;
	recognition.maxAlternatives = 1;

	if( debug ) {
		[
		 'onaudiostart',
		 'onaudioend',
		 'onend',
		 'onerror',
		 'onnomatch',
		 'onresult',
		 'onsoundstart',
		 'onsoundend',
		 'onspeechend',
		 'onstart'
	 	].forEach( eventName => recognition[ eventName ] = e => console.log( eventName, e ) );
	}

	return recognition;
}

function controller() {
	let register$ = shoe( '/register' );

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
		let result = event.results[0][0].transcript;

		$callsign.textContent = result;
		$record.removeAttribute( 'disabled' );

		console.log( result );

		register$.write( JSON.stringify( result ) );
	};

	// Hook up
	$register.addEventListener( "click", function( event ) {
		event.preventDefault();
		recognition.start();
		$register.textContent = 'Recording...';
	});
}
