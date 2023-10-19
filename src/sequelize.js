"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize').Sequelize;
var sequelize = new Sequelize({
    database: 'books',
    username: 'root',
    password: 'omar0595334880+++',
    host: 'localhost',
    dialect: 'mysql',
    models: [__dirname + '/models'],
    define: {
        freezeTableName: true,
    },
});
exports.default = sequelize;
