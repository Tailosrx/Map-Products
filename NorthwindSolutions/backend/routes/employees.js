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

// Si deja el profe cambiar el id para que sea autoincremental con GENERATED ALWAYS AS IDENTITY
router.post('/', async (req, res) => {
    const { LastName, FirstName, Title, HireDate, City, Region } = req.body;

    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();

    let wrapper = {
        status: 'ok',
        errorText: '',
        data: null,
    };

    try {
        const maxIdResult = await pgClient.query('SELECT MAX("EmployeeID") AS max_id FROM employees');
        const nextEmployeeID = (maxIdResult.rows[0].max_id || 0) + 1;

        const query = `
            INSERT INTO employees ("EmployeeID", "LastName", "FirstName", "Title", "HireDate", "City", "Region")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [nextEmployeeID, LastName, FirstName, Title, HireDate, City, Region];
        const result = await pgClient.query(query, values);

        wrapper.data = result.rows[0];
        res.status(201).json(wrapper);
    } catch (error) {
        console.error('Error creating employee:', error);
        wrapper.status = 'error';
        wrapper.errorText = 'Failed to create employee';
        res.status(500).json(wrapper);
    } finally {
        await pgClient.end();
    }
});

export default router;