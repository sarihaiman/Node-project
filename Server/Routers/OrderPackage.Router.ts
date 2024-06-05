import express from 'express';
import {get,post,put,deleteOne}  from '../Controllers/OrderPackage.Controller';
const router = express.Router();

router.get('/OrderPackage', get)
router.post('/OrderPackage', post)
router.put('/OrderPackage/:id', put)
router.delete('/OrderPackage/:id', deleteOne)

export default router