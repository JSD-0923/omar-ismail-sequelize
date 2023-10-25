import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

import Customer from './customer'; 
import Book from './books'; 

const Rental = sequelize.define('rental', {
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id',
        },
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'id',
        },
      },
  });

Customer.belongsToMany(Book, { through: Rental });
Book.belongsToMany(Customer, { through: Rental });

export default Rental;
