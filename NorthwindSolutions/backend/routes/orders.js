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

router.post('/', async (req,res)=>{
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    const data = req.body

    const result = await pgClient.query('insert into orders ("OrderID","CustomerID","EmployeeID","OrderDate","RequiredDate","ShippedDate","ShipVia","Freight","ShipName","ShipAddress","ShipCity","ShipRegion","ShipPostalCode","ShipCountry") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
        [data.OrderID, data.CustomerID, data.EmployeeID, data.OrderDate, data.RequiredDate, data.ShippedDate, data.ShipVia, data.Freight, data.ShipName, data.ShipAddress, data.ShipCity, data.ShipRegion, data.ShipPostalCode, data.ShipCountry])
    // res.json(result.rows[0]);
    res.json({message: "Producte insertat correctament", data: data});
    await pgClient.end();
});

router.put('/:id', async (req,res)=>{
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    const data = req.body
    const result = await pgClient.query('update orders set "CustomerID"=$1, "EmployeeID"=$2, "OrderDate"=$3, "RequiredDate"=$4, "ShippedDate"=$5, "ShipVia"=$6, "Freight"=$7, "ShipName"=$8, "ShipAddress"=$9, "ShipCity"=$10, "ShipRegion"=$11, "ShipPostalCode"=$12, "ShipCountry"=$13 where "OrderID"=$14',
        [data.CustomerID, data.EmployeeID, data.OrderDate, data.RequiredDate, data.ShippedDate, data.ShipVia, data.Freight, data.ShipName, data.ShipAddress, data.ShipCity, data.ShipRegion, data.ShipPostalCode, data.ShipCountry, req.params.id])
    // res.json(result.rows[0]);
    res.json({message: "Producte actualitzat correctament", data: data});
    await pgClient.end();
});




export default router;