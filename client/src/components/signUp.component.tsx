
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { SignUp } from '../api/user.api';

// import axios from 'axios';
import { User } from '../interface/user.interface';

const inputStyle = {
    height: '75px',
    width: '300px'
};

export default function SignUpForm() {

    // const port = 6000;
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
        // setEmailError('');
        // setPasswordError('');
        // setNameError('');
        // setPhoneError('');
        validateEmail(email);
        validatePassword(password);
        validateName(name);
        validatePhone(phone);
        // console.log(emailError);
        // console.log(phoneError);
        // console.log(nameError);
        // console.log(passwordError);
        // if(!(emailError!=' '|| phoneError!=' '|| nameError!=' '|| passwordError!=' '))
        try {
            const user : User = {
                email, 
                password,
                phone,
                id: '',
                username: ''
            };
            const response = await SignUp(user);
            setEmail('')
            setName('')
            setPassword('')
            setPhone('')
            console.log('SignUp successful:', response.data);
            // Add logic here to handle successful SignUp
        } catch (error) {
            console.error('Error logging in:', error);
            // Add logic here to handle SignUp error
        }
        // else
        // alert("error")
    };

    return (
        <div>
            <h1>Sign Up</h1>
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
            <Button variant="contained" onClick={handleSignUp}>SignUp</Button>
            </div>
    );
}