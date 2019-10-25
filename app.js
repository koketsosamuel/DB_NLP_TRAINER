const express = require('express')
const ejs = require("ejs")
const app = express()
const low = require("lowdb")
const bodyParser = require("body-parser")

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('test.json')
const db = low(adapter)



db.defaults({ intents: [], docs: [], ans: [] })
  .write()

app.use(bodyParser.json())

app.set("view engine", "ejs")

app.get("/", (req, res) => {

    res.render("Home")

})

app.post("/add", (req, res) => {


    let obj = req.body.obj

    if(req.body.table == "intents") {
        obj = req.body.obj.intent
    }

    db
        .get(req.body.table)
        .push(obj)
        .write()

    res.sendStatus(201)

})

app.get("/get", (req, res) => {

    res.json(db.getState().intents)

})

app.listen(316, () => {
    console.log(`Server started on port`);
});