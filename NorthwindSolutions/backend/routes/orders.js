import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection.js';

const router = Router();

router.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query('SELECT * FROM orders');
    res.json(query.rows);
    await pgClient.end();
});

router.get('/:id', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query(`SELECT * FROM orders WHERE "OrderID" = $1`, [req.params.id]);
    res.json(query.rows[0]);
    await pgClient.end();
});

app.post('/', async (req,res)=>{
    await pgClient.connect();
    const data = req.body

    const result = 'INSERT INTO orders (OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'
    [data.OrderID, data.CustomerID, data.EmployeeID, data.OrderDate, data.RequiredDate, data.ShippedDate, data.ShipVia, data.Freight, data.ShipName, data.ShipAddress, data.ShipCity, data.ShipRegion, data.ShipPostalCode, data.ShipCountry]
    res.json({"message": "Producte insertat correctament"});
});




export default router;