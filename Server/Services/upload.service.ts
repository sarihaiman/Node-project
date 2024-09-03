import { Response, Request } from 'express';

export const uploadFile = async function(req: Request, res: Response) {
    // const file = req.file;
    // Handle the uploaded file, save it, etc.
    // alert('Upload');
    res.status(200).send('File uploaded successfully');
  };

