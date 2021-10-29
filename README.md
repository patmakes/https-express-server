# https-express-server
https server base with paths for postgres

Because sometimes you just need a (somewhat) secure server!

don't forget to update the paths with your tables and create the cert/key pair with...

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
