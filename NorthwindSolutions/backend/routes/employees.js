import { Router } from 'express';
import pg from 'pg';
import dbconnection from '../../dbconnection.js';

const router = Router();
/*
router.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query('SELECT * FROM employees');
    res.json(query.rows);
    await pgClient.end();
});
*/

router.get('/:id', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let query = await pgClient.query(`SELECT * FROM employees WHERE "EmployeeID" = $1`, [req.params.id]);
    res.json(query.rows[0]) || res.status(404).json({ error: 'Empleado no encontrado' });
    await pgClient.end();
});

/*
router.get('/:id/employees', async (req, res) => {
    try {
        let query = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN employee_territories et ON e.employee_id = et.employee_id
            WHERE et.territory_id = $1
        `, [req.params.id]);
        res.json(query.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener empleados por territorio' });
    }
});

*/


export default router;