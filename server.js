const fs = require('fs');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let bodyParser = require('body-parser');

const uri = 'mongodb://localhost/libros';

mongoose.connect(uri, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
});

// dynamically include routes (Controller)
fs.readdirSync('./app/controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./app/controllers/' + file);
        route.controller(app);
    }
});

mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

var router = express.Router();
app.use(router);


//app.set("view engine","pug");
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/app/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001);
