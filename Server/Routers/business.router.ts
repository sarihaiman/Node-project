import express from 'express';
import { get, put } from '../Controllers/business.Controller';
const router = express.Router();

router.get('/business', get)
router.put('/business', put)

export default router