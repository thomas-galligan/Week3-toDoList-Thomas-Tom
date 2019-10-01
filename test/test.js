const test = require("tape");
// const { handler, sortByStatus, sortByDate, addItem, deleteItem, changeStatus } = require("../src/handler.js");
const functions = require("../src/handler.js");

test("Testing Tape is working", t => {
	t.equal(1, 1, "One should equal one");
	t.end();
});

test("Creating a failing test", t => {
	t.equal(1, 2, "One should equal two(?!)");
	t.end();
});

test("Testing sortByDate()", t => {
	const arr = [
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:29 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:29 GMT",
		},
		{
			title: "take chinchilla for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:32 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:32 GMT",
		},
	];
	const method = "dateCreated";
	const actual = functions.sortByDate(method, arr);
	const expected = [
		{
			title: "take chinchilla for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:32 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:32 GMT",
		},
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:29 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:29 GMT",
		},
	];
	t.deepEqual(actual, expected, "sortByDate() should return the opposite order of the objects in the array.");
	t.end();
});

test("Testing sortByDate()", t => {
	const arr = [
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:52:18 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:18 GMT",
		},
		{
			title: "take chinchilla for walk",
			status: true,
			dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
		},
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:52:23 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:23 GMT",
		},
	];
	const method = "dateEdited";
	const actual = functions.sortByDate(method, arr);
	const expected = [
		{
			title: "take chinchilla for walk",
			status: true,
			dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
		},
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:52:23 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:23 GMT",
		},
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:52:18 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:18 GMT",
		},
	];
	t.deepEqual(actual, expected, "sortByDate() should return the opposite order of the objects in the array.");
	t.end();
});

test("Testing sortByStatus()", t => {
	const arr = [
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:52:18 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:18 GMT",
		},
		{
			title: "take chinchilla for walk",
			status: true,
			dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
		},
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:52:23 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:23 GMT",
		},
	];
	const actual = functions.sortByStatus(arr);
	const expected = [
		[
			{
				title: "take chinchilla for walk",
				status: true,
				dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
				dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
			},
		],
		[
			{
				title: "take dog for walk",
				status: false,
				dateCreated: "Fri, 27 Sep 2019 08:52:18 GMT",
				dateEdited: "Fri, 27 Sep 2019 08:52:18 GMT",
			},
			{
				title: "take dog for walk",
				status: false,
				dateCreated: "Fri, 27 Sep 2019 08:52:23 GMT",
				dateEdited: "Fri, 27 Sep 2019 08:52:23 GMT",
			},
		],
	];
	t.deepEqual(actual, expected, "sortByStatus() should return the opposite order of the objects in the array.");
	t.end();
});

test("Testing addItem()", t => {
	let arr = [];
	const convertedData = { title: "take dog for walk" };
	const preActual = functions.addItem(convertedData, arr);
	const actual = [preActual[0].title, preActual[0].status];
	const expected = ["take dog for walk", false];
	t.deepEqual(actual, expected, "addItem() should generate a new object and append it to the arr.");
	t.end();
});

test("Testing addItem()", t => {
	let arr = [];
	const convertedData = { title: "take dog for walk" };
	const preActual = functions.addItem(convertedData, arr);
	const actual = preActual.length;
	const expected = arr.length + 1;
	t.deepEqual(actual, expected, "addItem() increases the length of arr by 1.");
	t.end();
});

test("Testing deleteItem()", t => {
	let arr = [
		{
			title: "take chinchilla for walk",
			status: true,
			dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
		},
	];
	const convertedData = { title: "take dog for walk" };
	const actual = functions.deleteItem(convertedData, arr);
	const expected = [];
	t.deepEqual(actual, expected, "deleteItem() should delete an item from arr.");
	t.end();
});

test("Testing deleteItem()", t => {
	let arr = [
		{
			title: "take chinchilla for walk",
			status: true,
			dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
		},
	];
	const convertedData = { title: "take dog for walk" };
	const preActual = functions.deleteItem(convertedData, arr);
	const actual = preActual.length;
	const expected = arr.length - 1;
	t.deepEqual(actual, expected, "deleteItem() should decrease the length of arr by 1.");
	t.end();
});

test("Testing changeStatus()", t => {
	let arr = [
		{
			title: "take chinchilla for walk",
			status: true,
			dateCreated: "Fri, 27 Sep 2019 08:52:20 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:52:25 GMT",
		},
	];
	const convertedData = { title: "take dog for walk", status: false, id: 0 };
	const preActual = functions.changeStatus(convertedData, arr);
	const actual = preActual[0].status;
	const expected = false;
	t.deepEqual(actual, expected, "changeStatus() should change the status of arr to false.");
	t.end();
});
