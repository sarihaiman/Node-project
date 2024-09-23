import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { SignUp } from '../api/user.api';
import { FillDataCurrentUser } from '../redux/userAction';
import { useDispatch } from 'react-redux';
import { User } from '../interface/user.interface';
import { Link } from 'react-router-dom';

const inputStyle = {
    height: '40px',
    width: '100%',
};

export default function SignUpForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Email should be in the format "example@example.com"');
        }
    };

    const validateName = (name: string) => {
        const nameRegex = /^[\u0590-\u05FFa-zA-Z]{3,15}$/;
        if (!nameRegex.test(name)) {
            setNameError('Name should be between 3 and 15 characters long');
        }
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Phone number should be in the format 1234567890');
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

    const handleSignUp = async () => {
        validateEmail(email);
        validatePassword(password);
        validateName(name);
        validatePhone(phone);

        try {
            const user: User = {
                email,
                password,
                phone,
                id: 0,
                name,
                isAdmin: false
            };
            const response = await SignUp(user);
            setEmail('');
            setName('');
            setPassword('');
            setPhone('');
            dispatch(FillDataCurrentUser(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            sessionStorage.setItem("token", response.data);
            console.log('SignUp successful:', response.data);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
            <Typography variant="h4">Sign Up</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError ? true : false}
                helperText={nameError}
                style={inputStyle}
            />
            <br /><br /><br />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
                style={inputStyle}
            />
            <br /><br /><br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
                style={inputStyle}
            />
            <br /><br /><br />
            <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError ? true : false}
                helperText={phoneError}
                style={inputStyle}
            />
            <br /><br /><br />
            <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Already have an account?
                <Button color="primary" component={Link} to="/signIn">signIn</Button>
            </Typography>
        </div>
    );
}
