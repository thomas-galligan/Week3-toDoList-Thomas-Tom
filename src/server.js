const http = require("http");
const fs = require("fs");
const path = require("path");
const functions = require("./handler.js");

const port = 3000;

const server = http.createServer(functions.handler);

server.listen(port, function() {
	console.log(`Server is listening on port http://localhost:${port} . Ready to accept requests!`);
});
