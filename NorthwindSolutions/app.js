import express from 'express';
import dbconnection from './dbconnection.js';
import product from './backend/routes/products.js';
import customers from './backend/routes/customers.js';
import suppliers from './backend/routes/suppliers.js';
import suppliers from './backend/routes/categories.js';
const PORT = 3000;
// const { Pool } = pkg;
// import pg from 'pg';
// import cors from 'cors';

const app = express();

// app.use(cors({origin: '*'}));
app.use(express.static('public'));
// app.use(express.json());
app.use('/products', product);
app.use('/customers', customers);
app.use('/suppliers', suppliers);
app.use('/categories', categories);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});