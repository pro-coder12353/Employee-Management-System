const departmentRepository = require('../repositories/departmentRepository');


async function getAllDepartments() {
    return await departmentRepository.findAll();
}

async function createDepartment(dept_name) {
    return await departmentRepository.create(dept_name);
} 

async function updateDepartment(dept_name,id) {
    return await departmentRepository.update(dept_name,id);
}

async function removeDepartment(id) {
    return await departmentRepository.remove(id);
}

module.exports = { getAllDepartments,createDepartment,updateDepartment,removeDepartment };