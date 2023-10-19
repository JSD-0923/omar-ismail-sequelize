"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var sequelize_1 = require("./sequelize");
var bookRoutes_1 = require("./routes/bookRoutes");
var app = express();
app.use(bodyParser.json());
app.use(bookRoutes_1.default);
var host = 'localhost';
var port = 3000;
sequelize_1.default.sync().then(function () {
    app.listen(port, host, function () {
        console.log("Server is running on http://".concat(host, ":").concat(port));
    });
});
