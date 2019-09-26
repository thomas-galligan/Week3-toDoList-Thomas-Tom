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

const dataReader = (request, response, callback) => {
    let allTheData = "";

    request.on("data", chunckOfData => {
        allTheData += chunckOfData;
    });

    request.on("end", () => {
        const convertedData = querystring.parse(allTheData);

        let newToDoList = callback(convertedData);
        console.log(newToDoList);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`<h1>Successful ${request.method} request</h1>`);
    });
    return newToDoList;
};

const createItem = convertedData => {
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

    newToDoList.push(newItem);
    return newToDoList;
};

const deleteItem = convertedData => {
    let newToDoList = [...toDoList];
    id = convertedData.id;
    newToDoList.splice(id, 1);
    return newToDoList;
};

const changeStatus = convertedData => {
    let newToDoList = [...toDoList];
    id = convertedData.id;
    newStatus = convertedData.status;
    newToDoList[id].status = Boolean(newStatus);
    newToDoList[id].dateEdited = new Date().toUTCString();

    return newToDoList;
};

const handler = (request, response) => {
    const endpoint = request.url;

    if (endpoint === "/get-list") {
        console.log(toDoList);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`<h1>Successful GET request</h1>`);
    } else if (endpoint === "/create-post") {
        toDoList = dataReader(request, response, createItem);
    } else if (endpoint === "/delete-item") {
        toDoList = dataReader(request, response, deleteItem);
    } else if (endpoint === "/change-status") {
        toDoList = dataReader(request, response, changeStatus);
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
