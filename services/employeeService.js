const employeeRepository = require('../repositories/employeeRepository');

async function uploadPicture(id, filename) {
    return await employeeRepository.updatePicture(id, filename);
}

async function getAllEmployees(search,sort,limit,page) {
    return await employeeRepository.findAll(search,sort,limit,page);
}

async function createEmployee(emp_name , dept_id, phone_number,email_id,salary,hire_date,location) {
    return await employeeRepository.create(emp_name , dept_id, phone_number,email_id,salary,hire_date,location);
}

async function updateEmployee(emp_name , dept_id, phone_number,email_id,salary,hire_date,location,id) {
    return await employeeRepository.update(emp_name , dept_id, phone_number,email_id,salary,hire_date,location,id);
}

async function removeEmployee(id) {
    return await employeeRepository.remove(id);
}

module.exports = { uploadPicture, getAllEmployees ,createEmployee,updateEmployee,removeEmployee };