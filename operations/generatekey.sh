#!/bin/sh

openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem -subj /C=US/ST=City/L=City/O=company/OU=SSLServers/CN=localhost/emailAddress=talkway@talkway.com
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

rm csr.pem
