import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStats = createAsyncThunk(
    'dashboard/fetchStats',
    async() => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/dashboard', {
            headers: {Authorization: 'Bearer ' + token}
        });
        return response.data;
    }
);


const dashboardSlice = createSlice({
    name:'dashboard',
    initialState: {
        stats: {},
        loading: false,
        error: null
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export default dashboardSlice.reducer;