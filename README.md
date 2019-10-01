# Week3-toDoList-Thomas-Tom
### Authors: Thomas Kostrzewski & Tom Galligan
![Build status](https://travis-ci.com/thomas-galligan/Week3-toDoList-Thomas-Tom.svg?branch=master)

This is the backend of a To-Do web-app. We use node.js to construct an http server, which holds a to-do list. 

The server accepts a variety of requests for managing the to-do list. A full collection of these, with examples, can be found in the Postman collection at the bottom of this README. You will need Postman (https://www.getpostman.com/) to run them. 

Current features include:
- Adding a new item
- Changing an item's status
- Deleting an item
- Sorting items by date created
- Sorting items by date edited

### How to run the server on your local machine
- Clone the repository.
- Run `npm install` to install all the dependencies on your local machine.
- Run `npm start` to start the server and start sending requests to your new server.

### Known issues:
- Currently the to-do list is an array of objects, with each item being referenced by its index in the array. While this is a clean formulation on the back-end, it will pose problems during front-end integration as the item ids are not fixed. This issue will be fixed in version 1.1

![A screenshot of a post request in postman](https://i.ibb.co/5MhQH59/Screenshot-2019-09-27-at-14-02-29.png "Example POST request in postman")

## Postman collection
We have prepared some example requests for you to run. These can be used as templates to build your own custom requests.
https://www.getpostman.com/collections/c427528af19a4ebc122f
