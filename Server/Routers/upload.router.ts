import express from 'express';
import { post } from '../Controllers/upload.controller';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), post); 

export default router;