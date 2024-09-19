// import { useState } from 'react';
// import { TextField, Button, Typography, FormControl, InputLabel } from '@mui/material';
// import React from 'react';
// import { Select, MenuItem } from '@mui/material';
// import { OrderPackage } from '../interface/order.interface';
// import { addOrder } from '../api/order.api';
// import isTokenValid from '../utils/checkToken';
// import { useSelector } from 'react-redux';

// const packages = ['Chalake', 'NewBorn', 'SmathCake', 'Family', 'Children'];

// const AddOrderFormComponent = () => {
//     const [packageName, setPackageName] = useState('');
//     const [date, setDate] = useState('');
//     const [beginningHour, setBeginningHour] = useState('');
//     const [endHour, setEndHour] = useState('');
//     const userId: number = useSelector((state: any) => {
//         return state.userReducer.currentUser.id;
//     });

//     const handleAddOrder = async () => {
//         if (!isTokenValid()) { return; }
//         try {
//             const order: OrderPackage = {
//                 id: 0,
//                 userId,
//                 packageId: 1,
//                 date,
//                 beginningHour,
//                 endHour
//             };
//             console.log(order);
//             const response = await addOrder(order);
//             console.log('Order added successfully:', response);
//             setPackageName('');
//             setDate('');
//             setBeginningHour('');
//             setEndHour('');
//         } catch (error) {
//             console.log('Error adding order:', error);
//         }
//     };

//     const containerStyle: React.CSSProperties = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '400px',
//         padding: '20px',
//         border: '2px solid #ccc',
//         borderRadius: '10px',
//         margin: 'auto',
//         marginTop: '8vh',
//         marginBottom: '10vh',
//     };

//     const inputStyle: React.CSSProperties = {
//         height: '55px',
//         width: '100%',
//         marginBottom: '30px',
//     };

//     return (
//         <div style={containerStyle}>
//             <Typography variant="h4">Add Order Form</Typography>
//             <FormControl fullWidth style={inputStyle}>
//                 <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
//                 <Select
//                     label="Photography Package"
//                     value={packageName}
//                     onChange={(e) => setPackageName(e.target.value)}
//                 >
//                     {packages.map((option) => (
//                         <MenuItem key={option} value={option}>
//                             {option}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 style={inputStyle}
//             />
//             <TextField
//                 label="Beginning Hour"
//                 type="time"
//                 value={beginningHour}
//                 onChange={(e) => setBeginningHour(e.target.value)}
//                 style={inputStyle}
//             />
//             <TextField
//                 label="End Hour"
//                 type="time"
//                 value={endHour}
//                 onChange={(e) => setEndHour(e.target.value)}
//                 style={inputStyle}
//             />
//             <Button variant="contained" onClick={handleAddOrder}>Add Order</Button>
//         </div>
//     );
// };

// export default AddOrderFormComponent;



import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { OrderPackage } from '../interface/order.interface';
import { getAllPotograpyName, addOrder } from '../api/order.api';
import isTokenValid from '../utils/checkToken';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddOrderFormComponent = () => {
    const [packageName, setPackageName] = useState('');
    const [date, setDate] = useState('');
    const [beginningHour, setBeginningHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [packages, setPackages] = useState([]);

    const userId: number = useSelector((state: any) => {
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
                // const packageNames = data.map((item: any) => {item.type});
                const packageNames = data.map((item: any) => ({ id: item.id, type: item.type }));
                setPackages(packageNames);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, []);

    const handleAddOrder = async () => {
        if (!isTokenValid()) { return; }
        try {
            const selectedPackage = packages.find((pkg:any) => pkg.type === packageName);
            if (!selectedPackage) {
                throw new Error('Selected package not found');
            }
            const order: OrderPackage = {
                id: 0,
                userId,
                packageId: selectedPackage['id'],
                date,
                beginningHour,
                endHour
            };
            console.log(order);
            const response = await addOrder(order);
            console.log('Order added successfully:', order);
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
                {/* <Select
                    label="Photography Package"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                >
                    {packages.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select> */}
                <Select
                    label="Photography Package"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                >
                    {packages.map((option: any) => (
                        <MenuItem key={option.id} value={option.type}>
                            {option.type}
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

