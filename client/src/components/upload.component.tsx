import React, { useState } from 'react';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';

interface CustomFileUploadProps {
  name: string;
  multiple: boolean;
  accept: string;
  maxFileSize: number;
  customUpload: boolean;
  className: string;
  onSelect: (event: any) => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ onSelect, name, multiple, ...rest }) => {
  const handleSelect = (event: any) => {
    onSelect(event);
  };

  const handleCancel = () => {
    alert('jck');
  };

  const a = () => {
    alert('jck');
  };

  return (
    <FileUpload {...rest} onSelect={handleSelect}>
      <button onClick={handleCancel} className="p-button p-component p-button-text-icon-left p-button-plain">
        <span className="p-button-icon-left pi pi-times"></span>
        <span className="p-button-label p-c" onClick={a}>Cancel</span>
      </button>
    </FileUpload>
  );
};

const DocumentUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append('file', selectedFile);

      try {
        await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file', error);
      }
    } else {
      console.error('No file selected for upload');
    }
  };

  const handleSelectFile = (event: any) => {
    alert('Select file');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '500px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
      <h1>הוספת מסמך</h1>
      <input type="file" onChange={handleFileChange} />
      <CustomFileUpload name="myfile[]" multiple={false} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" maxFileSize={100485760} customUpload={true} className="document-file" onSelect={handleSelectFile}/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUploadComponent;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { FileUpload } from 'primereact/fileupload';

// const DocumentUploadComponent = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     if (selectedFile) {
//       formData.append('file', selectedFile);
//       try {
//         await axios.post('http://localhost:3000/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         alert('File uploaded successfully');
//       } catch (error) {
//         console.error('Error uploading file', error);
//       }
//     } else {
//       console.error('No file selected for upload');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload a File</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload File</button>
//     </div>
//   );
// };

// export default DocumentUploadComponent;
