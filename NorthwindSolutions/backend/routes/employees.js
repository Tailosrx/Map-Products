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
        // Usar parámetros preparados para evitar inyección de SQL
        const query = `
            INSERT INTO employees (LastName, FirstName, Title, HireDate, City, Region)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [LastName, FirstName, Title, HireDate, City, Region];
        const result = await pgClient.query(query, values);

        // Asignar los datos del empleado recién creado
        wrapper.data = result.rows[0];
        res.status(201).json(wrapper);
    } catch (error) {
        console.error('Error creating employee:', error);

        // Actualizar el wrapper con el mensaje de error
        wrapper.status = 'error';
        wrapper.errorText = 'Failed to create employee';
        res.status(500).json(wrapper);
    } finally {
        await pgClient.end();
    }
});

export default router;