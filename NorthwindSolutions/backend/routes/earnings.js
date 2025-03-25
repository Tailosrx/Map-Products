import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection.js';

const router = Router();

router.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query(`SELECT TO_CHAR(ROUND(SUM("UnitPrice" * "Quantity")::numeric, 2), '999,999,999.99') AS TotalGanado FROM order_details`);
    res.json(query.rows);
    await pgClient.end();
});

export default router;