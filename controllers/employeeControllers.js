const employeeService = require('../services/employeeService');

async function uploadPicture(req, res) {
    if(!req.file) {
        return res.status(400).json({ error: "No file uploaded"});
    }
    const { id } = req.params;
    const filename = req.file.filename;
    const employee = await employeeService.uploadPicture(id, filename);
    res.json(employee);
}
async function getAllEmployees (req, res) {
    const {search,sort,limit,page} = req.query;

    const employees = await employeeService.getAllEmployees(search,sort,limit,page);
    res.json(employees);
}

async function createEmployee (req, res) {
    const {emp_name , dept_id, phone_number,email_id,salary,hire_date,location } = req.body;
    
    const employee = await employeeService.createEmployee(emp_name , dept_id, phone_number,email_id,salary,hire_date,location);
    res.json(employee);
}

async function updateEmployee (req,res) {
    const { id } = req.params;
    const {emp_name , dept_id, phone_number,email_id,salary,hire_date,location} = req.body;

    const employee = await employeeService.updateEmployee(emp_name , dept_id, phone_number,email_id,salary,hire_date,location,id);
    res.json(employee);
}

async function removeEmployee( req,res) {
    const { id } = req.params;
    
    const employee = await employeeService.removeEmployee(id);
    res.json(employee);
}

module.exports = { uploadPicture,getAllEmployees,createEmployee,updateEmployee,removeEmployee };