import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Auth.css';
import {register} from "../../services/auth.js";
import { UserCog, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        accountType: '',
    });

    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const checkPasswordStrength = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long!";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter!";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter!";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one digit!";
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return "Password must contain at least one special character!";
        }
        // All checks passed
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification(null);

        const { email, password, confirmPassword, accountType } = formData; // Make sure to get accountType from state

        // --- Validation Checks ---
        if (!email.toLowerCase().endsWith("@make-it-all.co.uk")) {
            setNotification({ type: 'error', text: "Email must end in @make-it-all.co.uk" });
            return;
        }

        if (password !== confirmPassword) {
            setNotification({ type: 'error', text: "Passwords don't match!" });
            return;
        }

        // Check password strength
        const passwordError = checkPasswordStrength(password);
        if (passwordError) {
            // If we got an error message, show it and stop
            setNotification({ type: 'error', text: passwordError });
            return;
        }

        // --- All Validations Passed ---
        setLoading(true);

        try {
            await register(email, password, accountType);
            setNotification({ type: 'success', text: 'Successfully Registered. Now redirecting ...' });

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (err) {
            const errorMessage = err?.message || 'Registration failed.';
            setNotification({ type: 'error', text: errorMessage });
            setLoading(false); // Only set loading false on error
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-container">
                    <header>
                        {/* <img src={logo} alt="MakeItAll Logo" className="auth-logo" />*/}
                        <h1>Create Your Account</h1>
                        <p>Join MakeItAll, one place to handle all your tasks!</p>
                    </header>
                    <form onSubmit={handleSubmit} className="auth-form">

                        <div className="input-group">
                            <span className="input-icon"><Mail size={20} /></span>
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
                            <span className="input-icon"><Lock size={20} /></span>
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
                                {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                            </button>
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><Lock size={20} /></span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                placeholder=" "
                                disabled={loading}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label="Toggle confirm password visibility"
                                disabled={loading}
                            >
                                {showConfirmPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                            </button>
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><UserCog size={20} /></span>
                            <select
                                id="accountType"
                                value={formData.accountType}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            >
                                <option value="" disabled></option>
                                <option value="technicalSpecialist">Technical Specialist</option>
                                <option value="PM">Project Manager</option>
                                <option value="admin">Administrator</option>
                            </select>
                            <label htmlFor="accountType">Account Type</label>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        {notification && (
                            <p className={notification.type === 'error' ? 'outcome' : 'outcome outcome-success'}>
                                {notification.text}
                            </p>
                        )}

                    </form>
                    <div className="form-footer">
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};