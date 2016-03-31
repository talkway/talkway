(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function DataSourceFactory() {
	// DataSourceFactory extends Array, and wraps 'push' so it can be used for pub/sub.
	var array = new (Function.prototype.bind.apply(Array, [null].concat(Array.prototype.slice.call(arguments))))();
	// let subscribers = []; // TODO: this is a shared variable across all datasources

	// Mixing in custom methods
	Object.defineProperties(array, {
		'push': {
			enumerable: false,
			value: function value(data) {
				console.log('Pushed %o to datasource', data);

				// Add data to the datasource
				Array.prototype.push.call(array, data);

				// Call each subscriber with data & array
				array.__subscribers.forEach(function (fn) {
					return fn(array, data);
				});
			}
		},
		'subscribe': {
			enumerable: false,
			value: function value(fn) {
				array.__subscribers.push(fn);
			}
		},
		'__subscribers': {
			enumerable: false,
			value: []
		}
	});

	return array;
};

},{}],2:[function(require,module,exports){
'use strict';

// # Algorithms

function checkGeolocationSupport() {
	// check for Geolocation support
	navigator.geolocation ? console.log('Geolocation is supported.') : alert('Geolocation is not supported for this Browser/OS version yet.');
}

function positionHandler(position) {
	// Handle position information
	document.getElementById('Latitude').innerHTML = position.coords.latitude;
	document.getElementById('Longitude').innerHTML = position.coords.longitude;

	// console.log( "lat: %s lng: %s", position.coords.latitude, position.coords.longitude );
	console.log(position.coords);
}

function errorHandler(error) {
	alert('Error occurred. Error code: ' + error.code);
	// error.code can be:
	//   0: unknown error
	//   1: permission denied
	//   2: position unavailable (error response from locaton provider)
	//   3: timed out
}

// # Bootstrap
// check location on load
window.onload = function () {
	checkGeolocationSupport();
	navigator.geolocation.getCurrentPosition(positionHandler, errorHandler);
};

// monitor location -- fires whenever position changes
navigator.geolocation.watchPosition(positionHandler);

},{}],3:[function(require,module,exports){
'use strict';

// Types
// TODO: require these from types repo

var User = {
	id: Number,
	name: String
};

var Message = {
	id: Number,
	user: User,
	data: String,
	metadata: Object
};

var datasource = void 0;

function controller(ds) {
	// when 'submit' is clicked, parse the form, create a message, push it to the datasource (for now)
	var form = document.getElementById('Talkway');
	form.addEventListener('submit', formHandler);

	datasource = ds;
}

function formHandler(event) {
	event.preventDefault();
	var message = createMessage({ message: event.target.elements[0].value });

	datasource.push(message);
}

function createMessage(data) {
	// Create a message type from the defined structure
	var message = Object.assign({}, Message);

	// Populate the message type (we can later check against the structure)
	message.id = Math.random();
	message.user = { id: 0, name: "You" };
	message.data = data.message;
	message.metadata = null;

	return message;
}

module.exports = controller;

},{}],4:[function(require,module,exports){
'use strict';

// View

function MessageListView(data) {

	function createChild(el) {
		// return `<dt class="message">el.data</dt><dd class="user">el.user.name</dd>`;
		return '<dt class="message">' + el.data + '</dt><dd class="user">' + el.user.name + '</dd>';
	}

	return data.map(createChild).join('');
}

// Controller
function MessageController(datasource) {
	var el = document.querySelector('.message.list');
	el.innerHTML = MessageListView(datasource);

	datasource.subscribe(MessageController);
}

module.exports = MessageController;

},{}],5:[function(require,module,exports){
// Messages Data Source
'use strict';

var datasource = require('./lib/datasource.js');
var MessageList = datasource();

module.exports = MessageList;

},{"./lib/datasource.js":1}],6:[function(require,module,exports){
'use strict';

// Controller for the Talkway Application

// Datasources

var messages = require('./messages.js');

// Components -- inject DS into components?
var locator = require('./locator.js');
var message = require('./message.js')(messages);
var messagelist = require('./messagelist.js')(messages);

// Stub
var User = {
	id: 1,
	name: "Garbrand"
};

var Message = {
	id: 1,
	user: User,
	data: "Hello, World!",
	metadata: null
};

// Simulate incoming message
setTimeout(function () {
	return messages.push(Message);
}, Math.random() * 5 * 1000);

// Echo messages (very annoying)
function echo(datasource, data) {
	if (data.user.id !== 1) {
		(function () {
			var msg = Object.assign({}, Message);

			msg.data = "Yes, " + data.data + "!";

			setTimeout(function () {
				return datasource.push(msg);
			}, Math.random() * 2 * 1000);
		})();
	}
}

messages.subscribe(echo);

},{"./locator.js":2,"./message.js":3,"./messagelist.js":4,"./messages.js":5}]},{},[6]);
