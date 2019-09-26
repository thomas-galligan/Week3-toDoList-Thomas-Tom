const querystring = require("querystring");

let toDoList = [];

const handler = (request, response) => {
	const endpoint = request.url;

	if (endpoint === "/get-list") {
		console.log(toDoList);
		response.writeHead(200, { "Content-Type": "text/html" });
		response.end(`<h1>Successful GET request</h1>`);
	} else if (endpoint === "/create-post") {
		let allTheData = "";

		request.on("data", chunckOfData => {
			allTheData += chunckOfData;
		});

		request.on("end", () => {
			const postData = querystring.parse(allTheData);

			let newItem = {};
			newItem.title = postData.title;

			if (postData.status) {
				newItem.status = postData.status;
			} else {
				newItem.status = false;
			}

			const dateNow = new Date();
			newItem.dateCreated = dateNow.toUTCString();
			newItem.dateEdited = dateNow.toUTCString();

			toDoList.push(newItem);
			console.log(toDoList);

			response.writeHead(200, { "Content-Type": "text/html" });
			response.end("<h1>Successful POST request</h1>");
		});
	} else if (endpoint === "/delete-item") {
		let allTheData = "";

		request.on("data", chunckOfData => {
			allTheData += chunckOfData;
		});

		request.on("end", () => {
			const deleteInfo = querystring.parse(allTheData);
			id = deleteInfo.id;
			toDoList.splice(id, 1);
			response.writeHead(200, { "Content-Type": "text/html" });
			response.end("<h1>Successful deletion</h1>");
		});
	} else if (endpoint === "/change-status") {
		let allTheData = "";

		request.on("data", chunckOfData => {
			allTheData += chunckOfData;
		});

		request.on("end", () => {
			const requestInfo = querystring.parse(allTheData);
			id = requestInfo.id;
			newStatus = requestInfo.status;
			toDoList[id].status = Boolean(newStatus);
			response.writeHead(200, { "Content-Type": "text/html" });
			response.end("<h1>Successful change of status</h1>");
		});
	} else {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.end("<h1>not create post endpoint</h1>"); // finish response
	}
};

module.exports = handler;
