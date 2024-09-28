import express from 'express';
import { post , get} from '../Controllers/upload.controller';

const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), post); 
router.get('/upload', get); 

export default router;