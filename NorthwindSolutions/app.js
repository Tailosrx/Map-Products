import { Pool } from 'pg';
import express from 'express';
import dbconnection from './dbconnection.js';
const PORT = process.env.PORT || 3000;

// import pg from 'pg';
// import cors from 'cors';
import product from './backend/routes/products.js';

const app = express();

const pool = new Pool(dbconnection);


// app.use(cors({origin: '*'}));
app.use(express.static('public'));
// app.use(express.json());

app.use('/products', product);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
