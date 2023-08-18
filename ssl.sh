#/bin/bash
openssl req -x509 -newkey rsa:4096 \
-nodes -sha256 -subj '/CN=faker-server.local' \
-keyout private.pem -out cert.pem