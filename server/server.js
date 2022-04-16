const express = require('express');
const cors = require('cors');
const app = express();
const { url } = require('inspector');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { URL } = require("url");

const port = 5000
const hostname = "127.0.0.1";
const dbName = "testOrders";
const menuItemsCollection = "menuItems";
const orderCollection = "orders";
const uri = "mongodb+srv://order-server:0h92hrjtmmGf6A8R@cluster0.etobf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoDb = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.urlencoded());
app.use(express.json());
mongoDb.connect();

process.on('exit', (code) => {
    console.log("Exiting application with code: ", code);
    mongoDb.close();
})

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.end("Hello!");
});

app.get("/menuItems", (req, res) => {
    getMenuItems()
        .then((data) => {
            res.statusCode = 200;
            res.write(JSON.stringify(data));
            res.end();
        })
        .catch((err) => {
            console.log("error: ", err)
            res.statusCode = 500;
            res.write("An error occured: ", err);
            res.end();
        });
});

app.get("/orders", (req, res) => {
    getAllOrders()
        .then((data) => {
            res.statusCode = 200;
            res.write(JSON.stringify(data));
            res.end();
        })
        .catch((err) => {
            console.log("error: ", err)
            res.statusCode = 500;
            res.write("An error occured: ", err);
            res.end();
        });
});

app.listen(port, hostname, () => {
    console.log(`Server listening at: http://${hostname}:${port}`);
});

async function getAllOrders() {
    console.log("Retrieving orders");
    try {
        return await mongoDb.db(dbName).collection(orderCollection).find().sort({ "status": { $meta: "PENDING" }, "creation_date": 1 }).toArray();
    } catch (err) {
        console.error("Error getAllOrders", err);
    }
}

async function getMenuItems() {
    console.log("Retrieving menu items");
    try {
        return await mongoDb.db(dbName).collection(menuItemsCollection).find().toArray();
    } catch (err) {
        console.error("Error getMenuItems", err);
    }
}

function getOutstandingOrders() {

}

function getCompletedOrders() {

}

function addOrder(order) {
    try {
        await mongoDb.db(dbName).collection(orderCollection).insertOne(order)
            .then(result => {
                console.log("Successfully added order: ", result);
                return true;
            }, err => {
                console.log("Error adding order: ", result);
                return false
            });
    } catch (err) {

    }
}

function updateOrder(order) {

}

console.log("Server started");