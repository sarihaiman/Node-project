import express from 'express';
import { get, post_signin, post_signup, put, deleteOne } from '../Controllers/user.controller';
const router = express.Router();

router.get('/user', get)
router.post('/user/signin', post_signin)
router.post('/user/signup', post_signup)
router.put('/user/:id', put)
router.delete('/user/:id', deleteOne)

export default router