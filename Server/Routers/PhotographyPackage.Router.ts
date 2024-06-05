import express from 'express';
import {get,post,put,deleteOne} from '../Controllers/PhotographyPackage.Controller';
const router = express.Router();

router.get('/PhotographyPackage', get)
router.post('/PhotographyPackage', post)
router.put('/PhotographyPackage/:id', put)
router.delete('/PhotographyPackage/:id', deleteOne)

export default router