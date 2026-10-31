import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from './redux/authSlice';

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        localStorage.removeItem('token');
        dispatch(clearToken());
        navigate('/login');
    }


    return (
        <nav className='navbar'>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/employees">Employees</NavLink>
            <NavLink to="/departments">Departments</NavLink>

            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;
