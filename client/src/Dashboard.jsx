import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchStats } from "./redux/dashboardSlice";

import NavBar from "./NavBar";

function Dashboard() {

    const dispatch = useDispatch();
    const stats = useSelector((state) => state.dashboard.stats);

    const loading = useSelector((state) => state.dashboard.loading);
    const error = useSelector((state) => state.dashboard.error);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    return (
        <div>


            <NavBar />
            <h2>Dashboard</h2>

            {loading && <p>Loading ...</p>}
            {error && <p style={{ color: 'red'}}>Error: {error}</p>}

            <p>Total Employees: {stats.totalEmployees}</p>
            <p>Total Departments: {stats.totalDepartments}</p>
            <p>Active Employees: {stats.activeEmployees}</p>
        </div>
    );
}


export default Dashboard;