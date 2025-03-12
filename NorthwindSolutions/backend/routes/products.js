import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection';

const router = Router();


// router.get('/', (req, res) => {
//   res.send('Hello World');
// });



router.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query('SELECT * FROM products');
    res.json(query.rows);
    await pgClient.end();
});




export default router;