const querystring = require("querystring");
const router = require("./router.js");

let toDoList = [];

const dataReader = (request, response, callback) => {
	let allTheData = "";

	request.on("data", chunckOfData => {
		allTheData += chunckOfData;
	});
	request.on("end", () => {
		const convertedData = querystring.parse(allTheData);
		console.log(convertedData);
		newToDoList = callback(convertedData, toDoList);
		console.log("inside request.on: ", newToDoList);
		response.writeHead(200, { "Content-Type": "text/html" });
		response.end(`<h1>Successful ${request.method} request</h1>`);
		toDoList = [...newToDoList];
	});
};

const handler = (request, response) => {
	const endpoint = request.url;
	const reqMethod = request.method;
	if (endpoint === "/get-list") {
		if (reqMethod !== "GET") {
			response.writeHead(400, { "Content-Type": "text/html" });
			response.end("<h1>Bad request, please try again with a 'GET' method");
			return;
		}
		console.log("Here is your to do list: ", toDoList);
		response.writeHead(200, { "Content-Type": "text/html" });
		response.end(`<h1>Successful GET request</h1>`);
	} else if (router.routes[endpoint]) {
		if (reqMethod !== router.routes[endpoint][1]) {
			response.writeHead(400, { "Content-Type": "text/html" });
			response.end(`<h1>Bad request, please try again with a ${router.routes[endpoint][1]} method</h1>`);
			return;
		}
		dataReader(request, response, router.routes[endpoint][0]);
	} else if (endpoint.indexOf("sort") !== -1) {
		if (method !== "GET") {
			response.writeHead(400, { "Content-Type": "text/html" });
			response.end("<h1>Bad request, please try again with a 'GET' method");
			return;
		}
		const method = endpoint.split("=")[1]; // get method for sorting
		if (method === "dateCreated" || method === "dateEdited") {
			const sortedToDoList = router.sortByDate(method, toDoList);
			console.log(sortedToDoList);
		} else if (method === "status") {
			request.on("end", () => {
				[completeItems, incompleteItems] = router.sortByStatus(toDoList);
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

// module.exports = handler;
module.exports = {
	handler,
};
