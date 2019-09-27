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

const addItem = (requestObj, toDoList) => {
    let newToDoList = [...toDoList];
    let newItem = {};
    newItem.title = requestObj.title;

    if (requestObj.status) {
        newItem.status = requestObj.status;
    } else {
        newItem.status = false;
    }

    const dateNow = new Date();
    newItem.dateCreated = dateNow.toUTCString();
    newItem.dateEdited = dateNow.toUTCString();
    newToDoList.push(newItem);
    return newToDoList;
};

const deleteItem = (requestObj, toDoList) => {
    let newToDoList = JSON.parse(JSON.stringify(toDoList));
    id = requestObj.id;
    newToDoList.splice(id, 1);
    return newToDoList;
};

const changeStatus = (requestObj, toDoList) => {
    let newToDoList = [...toDoList];
    const id = requestObj.id;
    const newStatus = requestObj.status;
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
