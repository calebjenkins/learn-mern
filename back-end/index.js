const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

// const DB = require("./DB")

// Add to local .env file:
// PORT = 5050
// DB_User = ""
// DB_PW = ""

const DB_User = process.env.DB_User;
const DB_PW = process.env.DB_PW;
const PORT = process.env.PORT || 5050;

const { MongoClient, ServerApiVersion } = require('mongodb');
const conn_str = `mongodb+srv://${DB_User}:${DB_PW}@learn-mern.znep5xs.mongodb.net/?retryWrites=true&w=majority`;
    
const getMongoDB = async () =>
{
    let logConnString = conn_str.replace(/\/(.*:.*)@/, "//----:----@");
    console.log(`Connecting to database using ${logConnString}`);
    try
    {
        const client = await MongoClient.connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true });
        db = await client.db("learn_mern_todo");
    }
    catch (e)
    {
        console.log(e.toString());
    }
}

let db = getMongoDB()

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/data/", async (req, res) =>
{
    let coll = await db.collection("todo");
    let data = await coll.find().toArray();
    res.status(200).send(data);
});

app.get("/data/:index", async (req, res) =>
{
    let coll = await db.collection("todo");
    let itm = await coll.findOne({"_id": req.params.index});

    if(!itm)
    {
        res.status(404).send(itm);

    } else {

        res.status(200).send(itm);
    }
});

// Upcerting
app.post("/data/", async (req, res) => {

    let coll = await db.collection("todo");
    let data = await coll.find().toArray();
    

    let newID = data.length + 1;
    let newData = req.body;

    console.log(`NewID: ${newID}`);

    // New Item
    if(!newData._id)
    {
        newData._id = newID.toString();
        let result = await coll.insertOne(newData);
        res.status(201).send(`added! id: ${ newData._id }"`);
        return;
    }

    // Update -- stop trying to do this in memory, use a DB - Mongo
    let itm = data.find(itm => itm._id == newData._id);
    if(itm != null)
    {
        let result = await coll.updateOne(
            { _id: itm._id.toString()},
            { $set: newData}
        );

        console.log(`Update Result: ${result}`);
        res.status(201).send(`updated! id: ${ newData._id }"`);
        return;
    }

    res.status(500).send("Update or insert failed");  
});

app.delete("/data/:id", async (req, res) => {
    let coll = await db.collection("todo");
    let data = await coll.deleteOne({"_id" : req.params.id });

    req.status(200).send("deleted");

});

app.listen(PORT, () => console.log (`server started on port: ${PORT}`));
