const express = require('express');
const bodyParser = require('body-parser');
import sequelize from './sequelize';
import * as passport  from "passport";
import bookRoutes from './routes/bookRoutes';
import customerRoutes from "./routes/customerRoutes";

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());
import './passport';
app.use('/customers', customerRoutes);
app.use( bookRoutes);


const host = 'localhost';
const port = 3000;
sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
});
