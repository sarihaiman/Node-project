import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getBusinessDetaild, editBusinessDetaild } from '../../api/business_details.api';
import { businessDetails } from '../../interface/businessDetails.interface';

const BusinessDetails = () => {
    const [businessDetails, setBusinessDetails] = useState<businessDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<businessDetails | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await getBusinessDetaild();
                setBusinessDetails(response as businessDetails);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching business details:', error);
                setIsLoading(false);
            }
        };

        fetchBusinessDetails();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDetails(businessDetails!);
    };

    const handleSave = async () => {
        try {
            if (editedDetails) {
                await editBusinessDetaild(editedDetails);
                setBusinessDetails(editedDetails);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating business details:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDetails(null); // Clear edited details
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (editedDetails) {
            const { name, value } = e.target;
            setEditedDetails({ ...editedDetails, [name]: value });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    {isEditing ? (
                        <>
                            {editedDetails && (
                                <>
                                    <IconButton style={{ alignSelf: 'flex-end' }} onClick={handleCancelEdit}>
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h4">Edit business Details</Typography>
                                    <br />
                                    <TextField
                                        name="name"
                                        label="Business Name"
                                        value={editedDetails.name}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <TextField
                                        name="adress"
                                        label="Business Address"
                                        value={editedDetails.adress}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <TextField
                                        name="phone"
                                        label="Business Phone"
                                        value={editedDetails.phone}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <Button onClick={handleSave}>Save</Button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                        <br />
                            <Typography variant="h4">Business Details</Typography>
                            {businessDetails && (
                                <>
                                    <Typography variant="h6">Name: {businessDetails.name}</Typography>
                                    <Typography variant="h6">Address: {businessDetails.adress}</Typography>
                                    <Typography variant="h6">Phone: {businessDetails.phone}</Typography>
                                    <Button onClick={handleEdit}>Edit</Button>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default BusinessDetails;
