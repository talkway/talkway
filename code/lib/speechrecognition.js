'use strict';

module.exports = function SpeechRecognition( debug ) {

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
