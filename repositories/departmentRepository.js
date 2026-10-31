const pool = require('../db/db');

async function findAll() {
    const result = await pool.query ('SELECT * FROM departments');
    return result.rows;
}

async function create(dept_name) {
    const result = await pool.query (
        'INSERT INTO departments (dept_name) VALUES ($1) RETURNING *',
        [dept_name]
    );
    return result.rows[0];
}

async function update(dept_name,id) {
    const result = await pool.query (
        'UPDATE departments SET dept_name = $1 WHERE dept_id = $2 RETURNING *',
        [dept_name,id]
    );
    return result.rows[0];
}

async function remove(id) {
    const result = await pool.query (
        'DELETE FROM departments WHERE dept_id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}


module.exports = { findAll,create,update,remove };