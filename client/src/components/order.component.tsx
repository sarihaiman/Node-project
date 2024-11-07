import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel} from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { OrderPackage } from '../interface/order.interface';
import { addOrderPackage } from '../api/order.api';
import { getAllPotograpyName } from '../api/PotographyPackage.api';
import { useSelector } from 'react-redux';
import { isTimeValid, isDateValid, isFormValid } from '../utils/validation';
import Swal from 'sweetalert2';

const AddOrderFormComponent = () => {
    const [packageName, setPackageName] = useState('');
    const [date, setDate] = useState('');
    const [beginingHour, setBeginingHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [packages, setPackages] = useState([]);
    const [note, setNote] = useState('');

    const userid: number = useSelector((state: any) => {
        return state.userReducer.currentUser.id;
    });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await getAllPotograpyName();
                if (!response) {
                    throw new Error('Failed to fetch data');
                }
                const data = response;
                const packageNames = data.map((item: any) => ({ id: item.id, type: item.type, moneyToHour: item.moneyToHour }));
                setPackages(packageNames);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, []);

    const calculateTotalCost = () => {
        const selectedPackage: any = packages.find((pkg: any) => pkg.type === packageName);
        if (!selectedPackage) {
            return 0;
        }
        const hourlyRate: number = selectedPackage.moneyToHour;
        const hours: number = (new Date(`1970-01-01T${endHour}:00`).getTime() - new Date(`1970-01-01T${beginingHour}:00`).getTime()) / 3600000;
        return hourlyRate * hours;
    };

    const handleAddOrder = async () => {
        if (!isFormValid(packageName, new Date(date), beginingHour, endHour) || !isTimeValid(beginingHour, endHour) || !isDateValid(new Date(date))) {
            return;
        }
        const cost = calculateTotalCost();
        Swal.fire({
            icon: 'info',
            title: 'Total Cost',
            text: `Total Cost: ${cost}$`,
            showCancelButton: true,
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                handleContinue();
            }
        });
    };

    const handleContinue = async () => {
        try {
            const selectedPackage = packages.find((pkg: any) => pkg.type === packageName);
            if (!selectedPackage) {
                throw new Error('Selected package not found');
            }
            const order: OrderPackage = {
                id: 0,
                userid,
                packageId: selectedPackage['id'],
                date: date.replace(/-/g, '/'),
                beginingHour,
                endHour,
                note
            };
            console.log(order);
            const response = await addOrderPackage(order);
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your order has been successfully added.',
            });
            setPackageName('');
            setDate('');
            setBeginingHour('');
            setEndHour('');
            setNote('');
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
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
                    {packages.map((option: any) => (
                        <MenuItem key={option.id} value={option.type}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span style={{ marginRight: 'auto' }}>{`${option.type}`}</span>
                                <span style={{ marginLeft: 'auto' }}>{`${option.moneyToHour}$ per hour`}</span>
                            </div>
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
                value={beginingHour}
                onChange={(e) => setBeginingHour(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="End Hour"
                type="time"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={inputStyle}
            />
            <Button variant="contained" onClick={handleAddOrder}>Add Order</Button>
        </div>
    );
};

export default AddOrderFormComponent;