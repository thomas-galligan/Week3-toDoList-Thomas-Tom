const querystring = require("querystring");
const handler = require("./handler.js");

let toDoList = [];

const dataReader = (request, response, callback) => {
    let allTheData = "";

    request.on("data", chunckOfData => {
        allTheData += chunckOfData;
    });
    request.on("end", () => {
        const convertedData = querystring.parse(allTheData);
        newToDoList = callback(convertedData, toDoList);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`<h1>Successful ${request.method} request</h1>`);
        toDoList = [...newToDoList];
    });
};

const router = (request, response) => {
    const endpoint = request.url;
    const reqMethod = request.method;
    if (endpoint === "/get-list") {
        if (reqMethod !== "GET") {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end(
                "<h1>Bad request, please try again with a 'GET' method"
            );
            return;
        }
        console.log("Here is your to do list: ", toDoList);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`<h1>Successful GET request</h1>`);
    } else if (handler.routes[endpoint]) {
        if (reqMethod !== handler.routes[endpoint][1]) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end(
                `<h1>Bad request, please try again with a ${
                    handler.routes[endpoint][1]
                } method</h1>`
            );
            return;
        }
        dataReader(request, response, handler.routes[endpoint][0]);
    } else if (endpoint.indexOf("sort") !== -1) {
        if (method !== "GET") {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end(
                "<h1>Bad request, please try again with a 'GET' method"
            );
            return;
        }
        const method = endpoint.split("=")[1]; // get method for sorting
        if (method === "dateCreated" || method === "dateEdited") {
            const sortedToDoList = handler.sortByDate(method, toDoList);
            console.log(sortedToDoList);
        } else if (method === "status") {
            request.on("end", () => {
                [completeItems, incompleteItems] = handler.sortByStatus(
                    toDoList
                );
                console.log("completed: ", completeItems);
                console.log("not completed: ", incompleteItems);
            });
        }
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Successful sort</h1>");
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404: not found</h1>"); // finish response
    }
};

module.exports = router;
