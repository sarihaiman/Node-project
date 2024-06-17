import express from 'express';
import { get, put } from '../Controllers/business.controller';
import aouthentication_admin from '../Middleware/aouthentication_admin.middleware';

const router = express.Router();

router.get('/business', get)
router.put('/business',aouthentication_admin, put)

export default router;