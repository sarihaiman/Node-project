import { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel } from '@mui/material';
import React from 'react';
import { Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
const packages = ['Chalake', 'NewBorn', 'SmathCake', 'Family', 'Children'];
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const AddOrderFormComponent = () => {
    const [packageId, setPackageId] = useState('');
    const [date, setDate] = useState('');
    const [beginningHour, setBeginningHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleAddOrder = async () => {
        // try {
        //     const order: OrderPackage = {
        //         id: 0,
        //         userId,
        //         packageId,
        //         date,
        //         beginningHour,
        //         endHour
        //     };
        //     console.log(order);
        //     const response = await addOrder(order);
        //     console.log('Order added successfully:', response);
        //     setUserId(0);
        //     setPackageId(0);
        //     setDate('');
        //     setBeginningHour('');
        //     setEndHour('');
        // } catch (error) {
        //     console.log('Error adding order:', error);
        // }
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Open select dialog</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <div>
                        <Typography variant="h4">Add Order Form</Typography>
                        <br />
                        <Box sx={{ minWidth: 300 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
                                <Select
                                    label="Photography Package"
                                    value={packageId}
                                    onChange={(e) => setPackageId(e.target.value)}
                                    style={{ width: '300px' }}>
                                    {packages.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <br /><br />
                        <TextField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{ style: { paddingLeft: '25px' } }} 
                            style={{ width: '300px' }}
                        />
                        <br /><br /><br />
                        <TextField
                            label="Beginning Hour"
                            type="time"
                            value={beginningHour}
                            onChange={(e) => setBeginningHour(e.target.value)}
                            InputLabelProps={{ style: { paddingLeft: '25px' } }} 
                            style={{ width: '300px' }}
                        />
                        <br /><br /><br />
                        <TextField
                            label="End Hour"
                            type="time"
                            value={endHour}
                            onChange={(e) => setEndHour(e.target.value)}
                            InputLabelProps={{ style: { paddingLeft: '25px' } }}
                            style={{ width: '300px' }}
                        />
                        <br />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddOrder}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddOrderFormComponent;






