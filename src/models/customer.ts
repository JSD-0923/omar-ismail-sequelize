import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

 const Customer = sequelize.define('customer', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Customer;
