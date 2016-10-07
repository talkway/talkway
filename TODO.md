## Mandatory
1. make the node process HTTP, put a HTTPS server in front of it on production
1. attach the user to the message
1. stream messages to all connected clients
1. extend the UI logic to make sure only registered users send a message

## Linear
1. centralize the JSON transport (wrap `shoe`?)
1. make separate channels for streams (e.g. `/register`, `/message`)
