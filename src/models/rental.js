"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize_2 = require("../sequelize");
var customer_1 = require("./customer");
var books_1 = require("./books");
var Rental = sequelize_2.default.define('rental', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rentalDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dueDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'book',
            key: 'id',
        },
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customer',
            key: 'id',
        },
    },
});
customer_1.default.hasMany(Rental);
Rental.belongsTo(customer_1.default);
books_1.default.hasMany(Rental);
Rental.belongsTo(books_1.default);
// Customer.belongsToMany(Book, { through: Rental });
// Book.belongsToMany(Customer, { through: Rental });
exports.default = Rental;
