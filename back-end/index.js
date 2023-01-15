const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5050;

let data =  [
    { id: 1, title: "Register for THAT", desc: "2023 is going to be amazing!", status: "done"},
    { id: 2, title: "Attend MERN workshop", desc: "Node.js and Reacte is going to be 🔥", status: "progress"},
    { id: 3, title: "Speak: Coding Naked", desc: "106 slides in 60 minutes - LETS GO!!", status: "todo"}
];



let app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/data/", async (req, res) => {

    res.status(200).send(data);

});

app.get("/data/:index", async (req, res) => {

   let itm =  data.find(itm => itm.id == req.params.index);

    if(!itm)
    {

        res.status(404).send(itm);

    } else {

        res.status(200).send(itm);
    }

});

// Upcerting

app.post("/data/", async (req, res) => {

    let newID = data.length + 1;
    let newData = req.body;

    console.log(`NewID: ${newID}`);

    // New Item
    let idProp = "id";
    if(!newData.id)
    {
        newData.id = newID;
        data.push(newData);
        res.status(201).send(`added! id: ${ newData.id }"`);
        return;
    }

    // Update -- stop tryin to do this in memory, use a DB - Mongo
    let itm = data.find(itm => itm.id == newData.id);
    if(itm != null)
    {
        data.slice(itm.index);
        data.push(newData);
        res.status(201).send(`updated! id: ${ newData.id }"`);
        return;
    }

    res.status(500).send("Update or insert failed");
    
});

app.listen(PORT, () => console.log (`server started on port: ${PORT}`));

