
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const inputStyle = {
    height: '75px',
    width: '300px'
};

export default function SigninForm() {
    const port = 6000;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Email should be in the format "example@example.com"');
        }
    };

    const validatePassword = (password: string) => {
        if (!password.match(/[A-Z]/)) {
            setPasswordError('Password must contain at least one uppercase letter');
        }
        if (!password.match(/[0-9]/)) {
            setPasswordError('Password must contain at least one number');
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        }
    };

    const handleSigninForm = async () => {
        setEmailError('');
        setPasswordError('');
        validateEmail(email);
        validatePassword(password);

        try {
            const response = await axios.post(`http://localhost:${port}/signin`, {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            console.log('SigninForm successful:', response.data);
            // Add logic here to handle successful SigninForm
        } catch (error) {
            console.error('Error logging in:', error);
            // Add logic here to handle SigninForm error
        }
    };

    return (
        <div>
            <br /><br /><br />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
                style={inputStyle} // Apply the fixed height style to the Email input field
            />
            <br /><br /><br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
                style={inputStyle} // Apply the fixed height style to the Password input field
            />
            <br /><br /><br />
            <Button variant="contained" onClick={handleSigninForm}>Signin</Button>
        </div>
    );
}