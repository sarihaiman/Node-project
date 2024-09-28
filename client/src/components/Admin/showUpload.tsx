import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

export default function DocumentUploadComponent() {
  const [filenames, setFilenames] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upload');
        setFilenames(response.data.files);
      } catch (error) {
        console.error('Error fetching files', error);
      }
    };
    fetchUploads();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
      <Typography variant="h6">File Names:</Typography>
      <ul>
        {filenames.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </ul>
    </div>
  );
};
