const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);


app.listen(4000,() => console.log('success'));