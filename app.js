const express = require('express'); //Llamamos a express

//Routers
const { usersRouter } = require('./routes/users.routes'); //Importamos users
const { repairsRouter } = require('./routes/repairs.routes');

//utils
const { db } = require('./utils/database');

const app = express(); //guardamos en app el express

//Enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter); //llamando a users
app.use('/api/v1/repairs', repairsRouter)
//aquí definimos el endpoint

db.authenticate() //Intentará conectarse a la db
  .then(() => console.log('Database connection successfully'))
  .catch(err => console.log(err));

db.sync({
  // force: true
}) //Intentará conectarse
  //EL FORCE ES PELIGROSOOOOOOOO
  .then(() => console.log('Sync successfully'))
  .catch(err => console.log(err));

const PORT = '4001';

//spin up server
app.listen(PORT, () => {
  console.log(`Express app running in port: ${PORT}`);
});
