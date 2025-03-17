import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection.js';

const router = Router();



router.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query('SELECT * FROM suppliers');
    res.json(query.rows);
    await pgClient.end();
});

router.get('/:id', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query(`SELECT * FROM suppliers WHERE "SupplierID" = $1`, [req.params.id]);
    res.json(query.rows[0]);
    await pgClient.end();
});





export default router;