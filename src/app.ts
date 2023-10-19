const express = require('express');
const bodyParser = require('body-parser');
import sequelize from './sequelize';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(bodyParser.json());

app.use(bookRoutes);

const host = 'localhost';
const port = 3000;
sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
});
