import express from 'express';
import {get,post,put,deleteOne} from '../Controllers/PhotographyPackage.Controller';
import aouthentication_admin from '../Middleware/aouthentication_admin.middleware';
const router = express.Router();

router.get('/PhotographyPackage', get)
router.post('/PhotographyPackage',aouthentication_admin, post)
router.put('/PhotographyPackage/:id',aouthentication_admin, put)
router.delete('/PhotographyPackage/:id',aouthentication_admin, deleteOne)

export default router