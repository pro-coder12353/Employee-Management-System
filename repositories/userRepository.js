const pool = require('../db/db');

//signup
async function create(email,HashedPassword,role) {
    const result = await pool.query (
        'INSERT INTO users(email,password,role) VALUES ($1,$2,$3) RETURNING user_id,email,role',
        [email, HashedPassword, role]
    );
    return result.rows[0];
}

//login
async function findByEmail(email) {
    const result = await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );
    return result.rows[0];
}


module.exports = { findByEmail, create };