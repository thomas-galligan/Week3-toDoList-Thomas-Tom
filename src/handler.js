const querystring = require("querystring");

let toDoList = [];

const sortByDate = (method, arr) => {
	// method should be either dateCreated or dateEdited
	const newArr = [...arr];

	newArr.sort((a, b) => {
		const dateA = new Date(a[method]);
		const dateB = new Date(b[method]);
		return dateB - dateA;
	});

	return newArr;
};

const sortByStatus = arr => {
	const trueArr = arr.filter(obj => obj.status === true);

	const falseArr = arr.filter(obj => obj.status === false);

	return [trueArr, falseArr];
};

const addItem = convertedData => {
	console.log("to do list at start of addItem: ", toDoList);
	let newToDoList = [...toDoList];
	let newItem = {};
	newItem.title = convertedData.title;

	if (convertedData.status) {
		newItem.status = convertedData.status;
	} else {
		newItem.status = false;
	}

	const dateNow = new Date();
	newItem.dateCreated = dateNow.toUTCString();
	newItem.dateEdited = dateNow.toUTCString();
	console.log("New item: ", newItem);
	newToDoList.push(newItem);
	console.log("pushed new todolist: ", newToDoList);
	return newToDoList;
};

const deleteItem = convertedData => {
	let newToDoList = JSON.parse(JSON.stringify(toDoList));
	id = convertedData.id;
	newToDoList.splice(id, 1);
	return newToDoList;
};

const changeStatus = convertedData => {
	let newToDoList = toDoList.slice(0);
	const id = convertedData.id;
	const newStatus = convertedData.status;
	newToDoList[id].status = Boolean(newStatus);
	newToDoList[id].dateEdited = new Date().toUTCString();

	return newToDoList;
};

const dataReader = (request, response, callback) => {
	let allTheData = "";

	request.on("data", chunckOfData => {
		allTheData += chunckOfData;
	});
	request.on("end", () => {
		const convertedData = querystring.parse(allTheData);
		newToDoList = callback(convertedData, toDoList);
		console.log("inside request.on: ", newToDoList);
		response.writeHead(200, { "Content-Type": "text/html" });
		response.end(`<h1>Successful ${request.method} request</h1>`);
		toDoList = [...newToDoList];
	});
};

const handler = (request, response) => {
	const endpoint = request.url;
	if (endpoint === "/get-list") {
		console.log("Here is your to do list: ", toDoList);
		response.writeHead(200, { "Content-Type": "text/html" });
		response.end(`<h1>Successful GET request</h1>`);
	} else if (endpoint === "/add-item") {
		console.log("endpoint is add-item");
		dataReader(request, response, addItem);
	} else if (endpoint === "/delete-item") {
		dataReader(request, response, deleteItem);
	} else if (endpoint === "/change-status") {
		dataReader(request, response, changeStatus);
	} else if (endpoint.indexOf("sort") !== -1) {
		const method = endpoint.split("=")[1]; // get method for sorting
		if (method === "dateCreated" || method === "dateEdited") {
			const sortedToDoList = sortByDate(method, toDoList);
			console.log(sortedToDoList);
		} else if (method === "status") {
			request.on("end", () => {
				[completeItems, incompleteItems] = sortByStatus(toDoList);
				console.log("completed: ", completeItems);
				console.log("not completed: ", incompleteItems);
			});
		}
		response.writeHead(200, { "Content-Type": "text/html" });
		response.end("<h1>Successful sort</h1>");
	} else {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.end("<h1>not create post endpoint</h1>"); // finish response
	}
};

module.exports = handler;
