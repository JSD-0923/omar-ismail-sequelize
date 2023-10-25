"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize_2 = require("../sequelize");
var Book = sequelize_2.default.define('book', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    published: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
});
exports.default = Book;
