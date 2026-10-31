import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    async function handleSignup() {
        try {
            await axios.post('http://localhost:4000/auth/signup', {email,password})
            navigate('/login');
        } catch (error) {
            console.log('Signup Failed', error.response.data.error);
        } 
    }

    return (
        <div className="signup-wrapper">
            <h1 className="app-title">Employee Management System</h1>

            <div className="auth-page">
                <h2>Signup</h2>
                <input type="email" placeholder="Enter Your Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button onClick={handleSignup}>Sign Up</button>
                <p>Already have an account?<Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;