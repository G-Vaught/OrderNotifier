const express = require('express');
const cors = require('cors');
const app = express();
const { url } = require('inspector');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { URL } = require("url");
const { PassThrough } = require('stream');
const serverUtils = require('./serverUtils');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000
const hostname = "127.0.0.1";
const dbName = "testOrders";
const menuItemsCollection = "menuItems";
const orderCollection = "orders";
const uri = "mongodb+srv://order-server:0h92hrjtmmGf6A8R@cluster0.etobf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoDb = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { ObjectId } = require('mongodb');

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    origin: '*'
}));
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
            serverUtils.setSuccess(res, data);
            res.end();
        })
        .catch((err) => {
            console.log("error: ", err)
            serverUtils.setError(res, null, "An error occurred fetching menu items").end();
        });
});

app.post("/menuItems/add", (req, res) => {
    console.log(req.body.name);
    if (!req.body) {
        serverUtils.setError(res, null, "An error occurred adding menu item").end();
    }
    let item = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        inStock: true
    }
    let isSuccess = addMenuItem(item);
    if (isSuccess) {
        serverUtils.setSuccess(res, getMenuItems()).end();
    } else {
        serverUtils.setError(res, null, "An error occurred adding menu item").end();
    }
});

app.post("/menuItems/delete", (req, res) => {
    if (!req.body.id) {
        serverUtils.setError(res, null, "An error occurred deleting menu item").end();
    }

    let isSuccess = deleteMenuItem(req.body.id);
    if (isSuccess) {
        serverUtils.setSuccess(res).end();
    } else {
        serverUtils.setError(res, null, "An error occurred deleting menu item").end();
    }
})

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
    let isSuccess = addOrder(req.body);
    if (isSuccess) {
        serverUtils.setSuccess(res, null, "Order added.").end();
    } else {
        serverUtils.setError(res, null, "Error adding order.").end();
    }
})

app.post("/orders/getUserOrder", (req, res) => {
    console.log("Post req params: ", req.body);

    getOrderById(req.body.userId)
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

async function addMenuItem(item) {
    console.log("Adding item: ", item);
    try {
        await mongoDb.db(dbName).collection(menuItemsCollection).insertOne(item).catch(err => console.error(err));
    } catch (err) {
        console.error("Error inserting item: ", item, " Error: ", err);
        return false;
    }
    return true;
}

async function deleteMenuItem(id) {
    console.log("Deleting item: ", id);
    try {
        await mongoDb.db(dbName).collection(menuItemsCollection).deleteOne({
            "_id": ObjectId(id)
        })
    } catch (err) {
        console.error("Error deleting item: ", id, " Error: ", err);
        return false;
    }
    return true;
}

async function getOutstandingOrders() {

}

async function getCompletedOrders() {

}

async function addOrder(order) {
    const orderItem = {
        user_id: order.user_id,
        items: order.items.map(item => {
            return {
                item_id: ObjectId(item.item_id),
                status: "PENDING",
                hasNotified: false
            }
        }),
        status: "PENDING",
        creation_date: new Date(),
        updated_date: new Date()
    }
    console.log("Adding new order: ", orderItem);
    try {
        await mongoDb.db(dbName).collection(orderCollection).insertOne(orderItem);
        return true;
    } catch (err) {
        console.error("Error adding new order: ", err);
        return false;
    }
}

function updateOrder(order) {

}

async function getOrderById(userId) {
    try {
        const orders = await mongoDb.db(dbName).collection(orderCollection).find({ user_id: userId }).toArray();
        console.log(orders);
        return orders;
    } catch (err) {
        return null;
    }
}

console.log("Server started");