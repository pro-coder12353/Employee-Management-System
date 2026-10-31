const departmentService = require('../services/departmentService');

async function getAllDepartments (req,res) {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
}

async function createDepartment (req,res) {
    const {dept_name} = req.body;

    const department = await departmentService.createDepartment(dept_name);
    res.json(department);
}

async function updateDepartment (req,res) {
    const {id} = req.params;
    const {dept_name} = req.body;
    
    const department = await departmentService.updateDepartment(dept_name,id);
    res.json(department);
}

async function removeDepartment (req,res) {
    const {id} = req.params;
    
    const department = await departmentService.removeDepartment(id);
    res.json(department);
}


module.exports = { getAllDepartments,createDepartment,updateDepartment,removeDepartment };