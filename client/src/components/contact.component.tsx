import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@material-ui/core';
import { WhatsApp, Phone, Email, Message } from '@material-ui/icons';

const Contact = () => {
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleWhatsAppClick = () => {
        window.open('https://api.whatsapp.com/send?phone=0533197414', '_blank');
    };

    const handleEmailClick = () => {
        window.open('mailto:s97414h@gmail.com');
    };

    const handlePhoneClick = () => {
        window.open('tel:+533197414');
    };

    const handleDirectMessageClick = () => {
        setShowMessageForm(true);
    };

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        if (name === 'name' && !/^[א-ת\s]*$/.test(value)) {
            return;
        }

        if (name === 'phone' && !/^\d{8,}$/.test(value)) {
            return;
        }

        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Grid container direction="column" alignItems="center">
            <Box display="flex" justifyContent="center" style={{ padding: '20px', margin: '20px' }}>
                <Grid container spacing={10} justify="center">
                    <Grid item><WhatsApp onClick={handleWhatsAppClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Email onClick={handleEmailClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Phone onClick={handlePhoneClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Message onClick={handleDirectMessageClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                </Grid>
            </Box>
            {showMessageForm && (
                <Box style={{ border: '2px solid rgb(111, 233, 224)', borderRadius: '10px', padding: '20px', margin: '20px' }}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item><TextField name="name" label="Name" value={formData.name} onChange={handleInputChange} fullWidth /></Grid>
                            <Grid item><TextField name="email" label="Email" value={formData.email} onChange={handleInputChange} fullWidth /></Grid>
                            <Grid item><TextField name="phone" label="Phone" value={formData.phone} onChange={handleInputChange} fullWidth /></Grid>
                            <Grid item><TextField name="message" label="Message" multiline rows={4} value={formData.message} onChange={handleInputChange} fullWidth /></Grid>
                            <Grid item><Button style={{ backgroundColor: 'rgb(111, 233, 224)', color: 'black' }} type="submit" variant="contained" color="primary">Send</Button></Grid>
                        </Grid>
                    </form>
                </Box>
            )}
        </Grid>
    );
};

export default Contact;
