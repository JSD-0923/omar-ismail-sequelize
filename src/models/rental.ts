import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

import Customer from './customer'; 
import Book from './books'; 

const Rental = sequelize.define('rental', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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

  Customer.hasMany(Rental);
  Rental.belongsTo(Customer);
  
  Book.hasMany(Rental);
  Rental.belongsTo(Book);


export default Rental;
