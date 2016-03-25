// # Algorithms
function checkGeolocationSupport() {
	// check for Geolocation support
	( navigator.geolocation ) ?
		console.log('Geolocation is supported.') :
		alert('Geolocation is not supported for this Browser/OS version yet.')
	;
}

function positionHandler ( position ) {
	// Handle position information
	document.getElementById( 'Latitude' ).innerHTML  = position.coords.latitude;
	document.getElementById( 'Longitude' ).innerHTML = position.coords.longitude;

	// console.log( "lat: %s lng: %s", position.coords.latitude, position.coords.longitude );
	console.log( position.coords );
}

function errorHandler ( error ) {
	alert('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from locaton provider)
    //   3: timed out
}




// # Bootstrap
// check location on load
window.onload = function() {
  checkGeolocationSupport();
  navigator.geolocation.getCurrentPosition( positionHandler, errorHandler );
};

// monitor location -- fires whenever position changes
navigator.geolocation.watchPosition( positionHandler );
