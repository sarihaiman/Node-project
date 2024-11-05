import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import File from '../Models/Files.model';

export const uploadFile = async (req: any, res: Response) => {
    try {
        const newFile = new File({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
        });
        await newFile.save();
        res.status(201).send('File uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
};

export const getUploadFile = async (req: Request, res: Response) => {
    try {
        const files = await File.find().exec();
        if (!files || files.length === 0) {
            return res.status(404).send('No files found');
        }
        res.json(files);
    } catch (error) {
        res.status(500).send('Error fetching files');
    }
}

export const getUploadFileOne = async (req: Request, res: Response) => {
    try {
        const file = await File.findOne({ filename: req.params.fileName });
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
        res.send(file.data);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Error fetching file');
    }
};