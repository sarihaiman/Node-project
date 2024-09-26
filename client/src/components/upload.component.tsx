import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaUpload, FaTimes } from 'react-icons/fa';
import { Button, Typography } from '@mui/material';

export default function DocumentUploadComponent(){
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const dropzoneStyle: React.CSSProperties = {
    border: '2px dashed #cccccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
  };
  
  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total!) * 100);
          setUploadProgress(progress);
        }
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }, []);

  const handleCancel = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const handleUpload = () => {
    setTimeout(() => {
      setUploadedFile(null);
      setUploadProgress(0); 
    }, 2000);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
      <Typography variant="h4">Upload a File</Typography>
      {uploadedFile ? (
        <div>
          <p>File: {uploadedFile.name}</p>
          <div style={{ width: '100%', border: '1px solid #000', borderRadius: '5px' }}>
            <div style={{ width: `${uploadProgress}%`, background: '#007bff', height: '20px', borderRadius: '5px' }}></div>
          </div>
          <p>{uploadProgress}% uploaded</p>
          <Button variant="contained" onClick={handleCancel} style={{marginLeft: '5px'}}><FaTimes /> Cancel</Button> 
          <Button variant="contained" onClick={handleUpload} style={{marginLeft: '15px'}}><FaUpload /> Upload File</Button>
        </div>
      ) : (
        <div {...getRootProps({ style: dropzoneStyle })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a file here, or click to select a file</p>
        </div>
      )}
    </div>
  );
};
