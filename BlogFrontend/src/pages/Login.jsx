import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth"; // Assuming you have an API function to handle login


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        console.log('Attempting to login with:', { email, password });

        try {
            const { token } = await loginUser(email, password);
            localStorage.setItem('token', token);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
            console.error('Login error:', err);
        }
    }



    return (
        <div style= {{ padding: "2rem" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label><br />
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label><br />
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <button type="submit">Login</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}

export default Login;