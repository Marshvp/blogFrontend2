import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/auth"; 



const SignUp = () => {
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');


        console.log('Attempting to sign up with:', { email, username, password });
        try {
            const { token, user } = await signUpUser(email, username, password);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/');
        } catch (err) {
            setError(err.message || 'Sign up failed');
            console.error('Sign up error:', err);
        }
    }



    return (

        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>UserName</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>IsAdmin</label>
                    <input
                        type="checkbox"
                        value="true"
                        onChange={(e) => console.log('IsAdmin:', e.target.checked, e.target.value)}
                    ></input>
                    <span>Check if you are an admin</span>
                </div>
                <button type="submit">Sign Up</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>

    )
}

export default SignUp;