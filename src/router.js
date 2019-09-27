const sortByDate = (method, toDoList) => {
    // method should be either dateCreated or dateEdited
    const newArr = [...toDoList];

    newArr.sort((a, b) => {
        const dateA = new Date(a[method]);
        const dateB = new Date(b[method]);
        return dateB - dateA;
    });

    return newArr;
};

const sortByStatus = toDoList => {
    arr = [...toDoList];
    const trueArr = arr.filter(obj => obj.status === true);

    const falseArr = arr.filter(obj => obj.status === false);

    return [trueArr, falseArr];
};

const addItem = (convertedData, toDoList) => {
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

const deleteItem = (convertedData, toDoList) => {
    let newToDoList = JSON.parse(JSON.stringify(toDoList));
    id = convertedData.id;
    newToDoList.splice(id, 1);
    return newToDoList;
};

const changeStatus = (convertedData, toDoList) => {
    let newToDoList = [...toDoList];
    const id = Number(convertedData.id);
    const newStatus = convertedData.status;
    console.log(newToDoList[id]);
    newToDoList[id].status = Boolean(newStatus);
    newToDoList[id].dateEdited = new Date().toUTCString();

    return newToDoList;
};

const routes = {
    "/add-item": [addItem, "POST"],
    "/delete-item": [deleteItem, "POST"],
    "/change-status": [changeStatus, "PATCH"]
};

module.exports = {
    routes,
    changeStatus,
    deleteItem,
    addItem,
    sortByDate,
    sortByStatus
};
