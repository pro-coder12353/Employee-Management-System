import { useDispatch } from 'react-redux';
import { setToken } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios  from 'axios';


    function Login() {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const params = new URLSearchParams(window.location.search);
        const expired = params.get('expired');

        const [ email, setEmail ] = useState('');
        const [password, setPassword ] = useState('');

        async function handleLogin() {
            try {
                const response = await axios.post('http://localhost:4000/auth/login',{ email,password });   
            const token = response.data.token;
            localStorage.setItem('token',token);
            dispatch(setToken(token));
            navigate('/dashboard');
        }
        catch (error) {
            console.log('Login failed:', error.response.data.error);

        }
    }

    return (
        <div className="login-wrapper">
            <h1 className="app-title">Employee Management System</h1>
            <div className="auth-page">
                <h2>Login</h2>

                { expired && <p style={{ color: 'red' }}>Your session expired. Please log in again </p> }

                <input
                    type="email"
                    placeholder='Enter Your Email Id'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an account? <Link to ="/signup">Signup</Link></p>
            </div>
        </div>
    );
}

export default Login;