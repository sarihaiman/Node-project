import { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel } from '@mui/material';
import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { OrderPackage } from '../interface/order.interface';
import { addOrder } from '../api/order.api';

const packages = ['Chalake', 'NewBorn', 'SmathCake', 'Family', 'Children'];

const AddOrderFormComponent = () => {
    const [packageName, setPackageName] = useState('');
    const [date, setDate] = useState('');
    const [beginningHour, setBeginningHour] = useState('');
    const [endHour, setEndHour] = useState('');

    const handleAddOrder = async () => {
        try {
            const order: OrderPackage = {
                id: 0,
                userId: 1,
                packageId: 1,
                date,
                beginningHour,
                endHour
            };
            console.log(order);
            const response = await addOrder(order);
            console.log('Order added successfully:', response);
            setPackageName('');
            setDate('');
            setBeginningHour('');
            setEndHour('');
        } catch (error) {
            console.log('Error adding order:', error);
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
        marginTop: '8vh',
        marginBottom: '10vh',
    };

    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    return (
        <div style={containerStyle}>
            <Typography variant="h4">Add Order Form</Typography>
            <FormControl fullWidth style={inputStyle}>
                <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
                <Select
                    label="Photography Package"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                >
                    {packages.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="Beginning Hour"
                type="time"
                value={beginningHour}
                onChange={(e) => setBeginningHour(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="End Hour"
                type="time"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                style={inputStyle}
            />
            <Button variant="contained" onClick={handleAddOrder}>Add Order</Button>
        </div>
    );
};

export default AddOrderFormComponent;
