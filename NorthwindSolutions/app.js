import express from 'express';
import path from 'path';
import dbconnection from './dbconnection.js';
import product from './backend/routes/products.js';
import customers from './backend/routes/customers.js';
import suppliers from './backend/routes/suppliers.js';
import categories from './backend/routes/categories.js';
import employees from './backend/routes/employees.js';
import orders from './backend/routes/orders.js';


const PORT = 3000;

const app = express();

// import cors from 'cors';
// app.use(cors({ origin: '*' }));
app.use(express.static('frontend'));



// app.use(cors({origin: '*'}));

// app.use(express.static('public'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('data'));
// app.use(express.json());

app.use('/products', product);
app.use('/customers', customers);
app.use('/suppliers', suppliers);
app.use('/categories', categories);
app.use('/employees', employees);
app.use('/orders', orders);


// Creamos una ruta para la página principal (index3.html)
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'frontend', 'index.html');
  console.log('Serving file:', filePath);
  res.sendFile(filePath); // Serve the file directly
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});