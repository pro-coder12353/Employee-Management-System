import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import employeesReducer from './employeesSlice.js';
import departmentsReducer from './departmentsSlice.js';
import dashboardReducer from './dashboardSlice.js';

export const store = configureStore ({
    reducer: {
        //slices
        auth: authReducer,
        employees: employeesReducer,
        departments: departmentsReducer, 
        dashboard: dashboardReducer,
    }
});