const querystring = require("querystring");

const postDataReader = (request, response) => {
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

        response.writeHead(303, { Location: "/" });
        response.end();
        console.log(newItem);
        return newItem;
    });
};

module.exports = postDataReader;
