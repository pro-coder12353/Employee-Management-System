import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDepartments = createAsyncThunk(
    'departments/fetchDepartments',
    async() => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/department', {
            headers: {Authorization: 'Bearer ' + token}
        });
        return response.data;
    }
);

const departmentsSlice = createSlice({
    name: 'departments',
    initialState: {
        list: [],
        loading: false,
        error: null
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default departmentsSlice.reducer;