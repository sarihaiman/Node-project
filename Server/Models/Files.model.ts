import mongoose, { Document } from 'mongoose';

interface IFile extends Document {
    filename: string;
    contentType: string;
    data: Buffer;
}

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    contentType: { type: String, required: true, default: 'application/octet-stream' }, // Set a default value or handle null/undefined
    data: { type: Buffer, required: true }
});

const File = mongoose.model<IFile>('File', fileSchema);

export default File;
