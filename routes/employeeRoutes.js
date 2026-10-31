const express = require('express');
const router = express.Router();
const upload= require('../middleware/upload');
const employeeControllers = require('../controllers/employeeControllers');
const { authenticateToken,requireadmin } = require('../middleware/auth');

router.put('/:id/picture', authenticateToken, requireadmin, upload.single('picture'), employeeControllers.uploadPicture);
router.get('/', authenticateToken, employeeControllers.getAllEmployees);
router.post('/', authenticateToken, requireadmin, employeeControllers.createEmployee);
router.put('/:id', authenticateToken, requireadmin, employeeControllers.updateEmployee);
router.delete('/:id', authenticateToken, requireadmin, employeeControllers.removeEmployee);

module.exports = router;