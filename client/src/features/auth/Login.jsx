import React, {useState} from 'react';
import '../../styles/Auth.css';
import {Mail, Lock, Eye, EyeOff} from 'lucide-react';
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../services/auth.js";


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e) {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const {email, password, confirmPassword} = formData;
        if (!email.toLowerCase().endsWith("@make-it-all.co.uk")) {
            setNotification({type: 'error', text: "Email must end in @make-it-all.co.uk"});
            // setError('Error: Email must end in @make-it-all.co.uk');
            return;
        }

        setLoading(true);

        try {
            await login(email, password);
            setNotification({type: 'success', text: 'Successfully Logged In. Now redirecting ...'});
            setTimeout(() => {
                navigate('/forum'); // this needs to be changed to whatever route we want to be at after logging in
            }, 1500);
        } catch (err) {
            const errorMessage = err?.message || 'Login failed.';
            setNotification({type: 'error', text: errorMessage});
            setLoading(false);
        }

        // would need to check all this against database, but not possivle rn
    };


    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-container">
                <header>
                    <h1>Login to your account!</h1>
                    <p>Login to <b>Make it All</b> and get productive now!</p>
                </header>
                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Email Field */}
                    <div className="input-group">
                        <span className="input-icon"><Mail size={20}/></span>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            placeholder=" "
                            disabled={loading}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-group">
                        <span className="input-icon"><Lock size={20}/></span>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            placeholder=" "
                            disabled={loading}
                        />
                        <label htmlFor="password">Password</label>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                            disabled={loading}
                        >
                            {showPassword ? <Eye size={22}/> : <EyeOff size={22}/>}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>

                    {notification && (
                        <p className={notification.type === 'error' ? 'outcome' : 'outcome outcome-success'}>
                            {notification.text}
                        </p>
                    )}


                </form>
                <div className="form-footer">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Login;