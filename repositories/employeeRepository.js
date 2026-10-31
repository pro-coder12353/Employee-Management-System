const pool = require('../db/db');

async function updatePicture(id, filename) {
    const result = await pool.query(
        'UPDATE employees SET profile_picture =$1 WHERE emp_id = $2 RETURNING *',
        [filename,id]
    );
    return result.rows[0];
}

async function findAll(search,sort,limit,page) {
    
    let query = 'SELECT * FROM employees';
    const values =[];

    if(search) {
        values.push('%' + search + '%')
        query = query + ' WHERE emp_name ILIKE $' + values.length;
    }

    const allowedSort = ['emp_name','salary','hire_date'];
    if(sort && allowedSort.includes(sort)) {
        query = query + ' ORDER BY ' + sort;
    }

    if(limit) {
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page) || 1;
        const offset = (pageNum - 1) * limitNum;
        query = query + ' LIMIT ' + limitNum + ' OFFSET ' + offset;
    }
    const result = await pool.query(query,values);
    return result.rows;
}


async function create(emp_name , dept_id, phone_number,email_id,salary,hire_date,location) {
    const result = await pool.query(
        'INSERT INTO employees(emp_name, dept_id, phone_number, email_id, salary, hire_date, location) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [emp_name , dept_id, phone_number,email_id,salary,hire_date,location]
    );
    return result.rows[0];
}


async function update(emp_name , dept_id, phone_number,email_id,salary,hire_date,location,id) {
    const result = await pool.query(
        'UPDATE employees SET (emp_name , dept_id, phone_number,email_id,salary,hire_date,location) = ($1,$2,$3,$4,$5,$6,$7) WHERE emp_id = $8 RETURNING *',
        [emp_name , dept_id, phone_number,email_id,salary,hire_date,location,id]
    );
    return result.rows[0];
}

async function remove(id) {
    const result = await pool.query(
        'DELETE FROM employees WHERE emp_id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}


module.exports = { updatePicture, findAll,create,update,remove };