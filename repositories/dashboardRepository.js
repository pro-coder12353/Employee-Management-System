const pool = require('../db/db');

async function countDepartments() {
    const result = await pool.query('SELECT COUNT(*) FROM departments');
    return result.rows[0].count;
}

async function countEmployees() {
    const result = await pool.query('SELECT COUNT(*) FROM employees');
    return result.rows[0].count;
}

async function countActiveEmployees() {
    const result = await pool.query('SELECT COUNT(*) FROM employees WHERE is_active = true');
    return result.rows[0].count;
}

module.exports = { countDepartments,countEmployees,countActiveEmployees};