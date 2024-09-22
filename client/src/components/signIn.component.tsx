import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FillDataCurrentUser } from '../redux/userAction';
import { useDispatch } from 'react-redux';
import { User } from '../interface/user.interface';
import { jwtDecode } from 'jwt-decode'
import { SignIn } from '../api/user.api';

export default function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

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
        validateEmail(email);
        validatePassword(password);
        try {
            const response:string = await SignIn( {
                email: email,
                password: password
            })
            sessionStorage.setItem("token", response);
            const userDecode:any = jwtDecode(response);
            setEmail('');
            setPassword(''); 
            const user: User = {
                email: userDecode.email,
                password : '',
                phone: userDecode.phone,
                id: userDecode.id,
                username: userDecode.name,
                isAdmin: userDecode.isAdmin
            };
            alert('hello: '+ userDecode.name)
            dispatch(FillDataCurrentUser(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            console.log('SigninForm successful:', response);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '400px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
    };

    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    return (
        <div style={containerStyle}>
            <Typography variant="h4">Sign In</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
                style={inputStyle}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
                style={inputStyle}
            />
            <Button variant="contained" onClick={handleSigninForm}>Signin</Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Not registered yet?
                <Button color="primary" component={Link} to="/signUp">signUp</Button>
            </Typography>
        </div>
    );
}
