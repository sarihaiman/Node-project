import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
// import { CustomRequest } from './CustomRequest'; 
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

// interface CustomRequest extends Request {
//   file: MulterFile;
// }
// export const uploadFile = async function(req: CustomRequest, res:Response) {
//   const file = req.file;
//   // מחיקת הקובץ לאחר העלאה
//   fs.unlinkSync(file.path);
//   res.status(200).send('File uploaded successfully');
//   };

export const uploadFile = async function (req: Request, res: Response) {
  const originalFileName = req.file?.originalname;
  console.log(originalFileName);
  res.status(200).send('File uploaded successfully');
};

export const getUploadFile = async function (req: Request, res: Response) {
  const uploadDir = path.join(__dirname, '../uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading upload directory:', err);
      res.status(500).send('Error reading upload directory');
    } else {
      res.status(200).json({ files });
    }
  });
};
