const express = require('express');
const router = express.Router();
const departmentsControllers = require('../controllers/departmentControllers');
const { authenticateToken, requireadmin } = require('../middleware/auth');

router.get('/', authenticateToken, departmentsControllers.getAllDepartments);
router.post('/', authenticateToken, requireadmin, departmentsControllers.createDepartment);
router.put('/:id', authenticateToken, requireadmin, departmentsControllers.updateDepartment);
router.delete('/:id', authenticateToken, requireadmin, departmentsControllers.removeDepartment);

module.exports = router;