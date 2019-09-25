const fs = require("fs");
const path = require("path");

const handlerHome = (request, response) => {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    response.writeHead(200);

    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("<h1>404 file not found</h1>");
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(file);
        }
    });
};

module.exports = handlerHome;
