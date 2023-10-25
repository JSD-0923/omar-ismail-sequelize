import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Book = sequelize.define('book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Book;
