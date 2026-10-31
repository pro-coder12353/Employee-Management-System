import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async({search = '', sort = '', page = 1, limit = 3} = {}) => {
        const token = localStorage.getItem('token')
        const response = await axios.get(
            'http://localhost:4000/employee?search=' + search + '&sort=' + sort + '&page=' + page + '&limit=' + limit, {
            headers: { Authorization: 'Bearer ' + token}
        });
        return response.data;
    }
);

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [],
        loading: false,
        error: null
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export default employeesSlice.reducer;