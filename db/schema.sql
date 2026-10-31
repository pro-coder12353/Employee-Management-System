CREATE TABLE IF NOT EXISTS departments(
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(300) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS employees(
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(300) NOT NULL,
    dept_id INT REFERENCES departments(dept_id),
    phone_number VARCHAR(15),
    email_id VARCHAR(100) NOT NULL UNIQUE,
    salary NUMERIC(10,2),
    hire_date DATE,
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    profile_picture VARCHAR(300)
);


CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    role VARCHAR(50) NOT NULL
);