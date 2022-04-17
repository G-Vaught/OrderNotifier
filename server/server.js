const express = require('express');
const cors = require('cors');
const app = express();
const { url } = require('inspector');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { URL } = require("url");
const { PassThrough } = require('stream');
const serverUtils = require('./serverUtils');


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
            console.log(data);
            serverUtils.setSuccess(res, data);
            res.end();
        })
        .catch((err) => {
            console.log("error: ", err)
            serverUtils.setError(res, null, "An error occurred fetching menu items").end();
        });
});

app.get("/orders", (req, res) => {
    getAllOrders()
        .then((data) => {
            serverUtils.setSuccess(res, data).end();
        })
        .catch((err) => {
            console.log("error: ", err)
            serverUtils.setError(res, null, "An error occurred fetching orders").end();
        });
});

app.post("/orders/addOrder", (req, res) => {
    console.log("Post req params: ", req.body);

    addOrder(JSON.parse(req.body))
        .then(() => {
            serverUtils.setSuccess(res, null, "Order added.").end();
        })
        .catch(err => {
            serverUtils.setError(res, null, "Error adding order.").end();
        })
})

app.post("/orders/getUserOrder", (req, res) => {
    console.log("Post req params: ", req.body);

    getOrderById(req.body.name)
        .then(order => {
            serverUtils.setSuccess(res, order).end();
        })
        .catch(err => {
            console.log("getOrderById error: ", err);
            serverUtils.setError(res, null, "Error getting user order");
        })

});

app.listen(port, hostname, () => {
    console.log(`Server listening at: http://${hostname}:${port}`);
});

async function getAllOrders() {
    console.log("Retrieving orders");
    try {
        return await mongoDb.db(dbName).collection(orderCollection).find().toArray();
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
        mongoDb.db(dbName).collection(orderCollection).insertOne(order)
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

function getOrderById(userId) {
    try {
        return mongoDb.db(dbName).collection(orderCollection).find({ user_id: userId }).toArray();
    } catch (err) {
        return null;
    }
}

console.log("Server started");