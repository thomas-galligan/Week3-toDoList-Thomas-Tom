const fs = require("fs");
const path = require("path");

const handlerPublic = (request, response, endpoint) => {
    const extension = endpoint.split(".")[1];
    const extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        ico: "image/x-icon",
        jpg: "image/jpg",
        png: "image/png"
    };

    const filePath = path.join(__dirname, "..", "public", endpoint);

    fs.readFile(filePath, (error, file) => {
        if (error) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("<h1>404 file not found</h1>");
        } else {
            response.writeHead(200, {
                "Content-Type": extensionType[extension]
            });
            response.end(file);
        }
    });
};

module.exports = handlerPublic;
