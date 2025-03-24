import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection.js';

const router = Router();

router.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query('SELECT * FROM employees');
    res.json(query.rows);
    await pgClient.end();
});


router.get('/:id', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query(`SELECT * FROM employees WHERE "EmployeeID" = $1`, [req.params.id]);
    res.json(query.rows[0]) || res.status(404).json({ error: 'Empleado no encontrado' });
    await pgClient.end();
});

router.get('/count', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query('SELECT COUNT(*) AS total_employees FROM employees');
    res.json(query.rows[0]) || res.status(404).json({ error: 'No se encontraron empleados' }); 
    await pgClient.end();
});

export default router;