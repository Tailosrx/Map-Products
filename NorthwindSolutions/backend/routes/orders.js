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


// app.post('/',(req,res)=>{
//     const {name,id} = req.body

//     const insert_query = 'INSERT INTO demotable (name,id) VALUES ($1, $2)'
    
//     con.query(insert_query, [name,id], (err, result)=>{
//         if(err){
//             res.send(err)
//         }else{
//             console.log(result)
//             res.send("POSTED DATA")
//         }
//     })
// });




export default router;