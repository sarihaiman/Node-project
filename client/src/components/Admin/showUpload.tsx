import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { domain } from '../../Config';

const downloadFile = async (fileUrl: string) => {
  console.log(fileUrl);
  try {
    const response = await axios.get(fileUrl, { responseType: 'blob' });
    console.log(response);
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileUrl.substring(fileUrl.lastIndexOf('/') + 1));
    link.style.display = 'none'; // Hide the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up

  } catch (error) {
    console.error('Error downloading file', error);
  }
};

export default function DocumentUploadComponent() {
  const [filenames, setFilenames] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get(`${domain}/upload`);
        const filenames = response.data.map((file: { filename: any; }) => file.filename); // Extract filenames from the response data
        setFilenames(filenames);
      } catch (error) {
        console.error('Error fetching files', error);
      }
    };
    fetchUploads();
  }, []);

  return (
    <div>
      <Typography style={{ textAlign: 'center' }} variant="h4">File Names:</Typography>
      <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filenames.map((fileName: any, index) => (
          <div key={index} style={{ width: '300px', height: '70px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ListItem key={index} component="li" style={{ cursor: 'pointer' }} onMouseEnter={(e:any) => e.target.style.backgroundColor = '#f0f0f0'} onMouseLeave={(e:any) => e.target.style.backgroundColor = 'transparent'} onClick={() => downloadFile(`${domain}/uploadOne/${fileName}`)}>
              <ListItemIcon>
                <GetAppIcon />
              </ListItemIcon>
              <ListItemText primary={fileName} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}
