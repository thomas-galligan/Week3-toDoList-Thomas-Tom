const http = require("http");
const fs = require("fs");
const path = require("path");
const handler = require("./handler.js");
const handlerPublic = require("./handlerPublic.js");
const handlerHome = require("./handlerHome.js");

const port = 3000;

const server = http.createServer(handler);

server.listen(port, function() {
    console.log(
        `Server is listening on port http://localhost:${port} . Ready to accept requests!`
    );
});
