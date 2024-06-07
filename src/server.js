"use strict";

var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    controller = require("./controller.js");

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
    }
    
const handler = (req, res) => {
const d = new Date()
res.end(d.toString())
}

module.exports = allowCors(handler)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.route("/api/candidates/:eMail/applications")
    .get(controller.queryApplications)

app.route("/api/applications")
    .post(controller.saveApplication)

app.route("/api/:entity")
    .get(controller.query)
    .post(controller.save);
app.route("/api/:entity/:id")
    .get(controller.show)
    .put(controller.update)
    .delete(controller.remove);

app.route("/api/:entity/:entityId/:related")
    .get(controller.queryRelationship)
    .post(controller.saveRelationship);
app.route("/api/:entity/:entityId/:related/:relatedId")
    .get(controller.showRelationship)
    .put(controller.updateRelationship)
    .delete(controller.removeRelationship);


// app.listen(process.env.PORT || 3000, function() {
//     console.log(`Server started ${process.env.PORT || 3000}`);
// });

app.listen(3000, function() {
    console.log("Server started");
});

