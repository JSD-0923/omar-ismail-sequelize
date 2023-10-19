const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    database:'books',
    username:'root',
    password:'omar0595334880+++',
    host:'localhost',
    dialect:'mysql',
    models:[__dirname+'/models'],
    define:{
        freezeTableName: true,
      },
});
export default sequelize;