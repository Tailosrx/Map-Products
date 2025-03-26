import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection.js';
import { json } from 'stream/consumers';
const router = Router();

router.get('/', async (req, res) => {
    let client = new pg.Client(dbconnection);
    await client.connect();

    const limit = parseInt(req.query.limit) || 1;
    const size = parseInt(req.query.offset) || 20;
    const offset = (limit - 1) * size;

    let result = await client.query('SELECT "OrderID", "CustomerID", "EmployeeID", "OrderDate", "RequiredDate", "ShippedDate", "ShipVia", "ShipName", "ShipAddress", "ShipCity", "ShipRegion", "ShipPostalCode", "ShipCountry" FROM Orders limit $1 offset $2', [size, offset]);
    // result.rows
    res.json(result.rows);
    await client.end();
});


router.get('/customers', async (req, res) =>{
    let client = new pg.Client(dbconnection);
    await client.connect();
    let result = await client.query('Select "CustomerID" From customers');
    res.json(result.rows);
    await client.end();
})

router.get('/employees', async (req, res)=>{
    let client = new pg.Client(dbconnection)
    await client.connect();
    let result = await client.query('SELECT "EmployeeID" FROM employees');
    res.json(result.rows);
    await client.end();
})


router.delete('/:id', async(req, res)=>{
    let client = new pg.Client(dbconnection);
    await client.connect();
    let result = await client.query(`DELETE FROM Orders where "OrderID" = $1;`, [req.params.id]);
    res.json(result.rows);
    await client.end();
})



router.get('/:id', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query(`SELECT * FROM orders WHERE "OrderID" = $1`, [req.params.id]);
    res.json(query.rows[0]);
    await pgClient.end();
});

router.post('/', async (req,res)=>{
    const data = req.body
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let params = [data.OrderID, data.CustomerID, data.EmployeeID, data.OrderDate, data.RequiredDate, data.ShippedDate, data.ShipVia, data.Freight, data.ShipName, data.ShipAddress, data.ShipCity, data.ShipRegion, data.ShipPostalCode, data.ShipCountry];
    // res.json(result.rows[0]);
    try {
        let result = await pgClient.query('insert into orders ("OrderID","CustomerID","EmployeeID","OrderDate","RequiredDate","ShippedDate","ShipVia","Freight","ShipName","ShipAddress","ShipCity","ShipRegion","ShipPostalCode","ShipCountry") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', params);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({eror: error.message});
    }
    await pgClient.end();
    // res.json({message: "Producte insertat correctament", data: data});
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