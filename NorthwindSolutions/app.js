import express from 'express';
import dbconnection from './dbconnection.js';
<<<<<<< HEAD


const PORT = process.env.PORT || 3000;
=======
import product from './backend/routes/products.js';
import customers from './backend/routes/customers.js';
const PORT = 3000;
// const { Pool } = pkg;
>>>>>>> e18af7571eca4074387bec1649a0a087d51c9894
// import pg from 'pg';
//import cors from 'cors';
import product from './backend/routes/products.js';

const app = express();
//const pool = new Pool(dbconnection);
//app.use(cors({origin: '*'}));
app.use(express.static('public'));
app.use(express.json());

app.use('/products', product);
app.use('/customers', customers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
