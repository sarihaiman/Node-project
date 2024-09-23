import { Response, Request } from 'express';
import fs from 'fs';
// import { CustomRequest } from './CustomRequest'; 
// import { MulterFile } from './MulterFile'; 

// interface CustomRequest extends Request {
//   file: MulterFile;
// }
// export const uploadFile = async function(req: CustomRequest, res:Response) {
//   const file = req.file;
//   // מחיקת הקובץ לאחר העלאה
//   fs.unlinkSync(file.path);
//   res.status(200).send('File uploaded successfully');
//   };

export const uploadFile = async function(req: Request, res:Response) {

  res.status(200).send('File uploaded successfully');
  };
