import express from 'express';
import { get, post_signin, post_signup, put, deleteOne } from '../Controllers/user.controller';
const router = express.Router();

router.post('/signin', post_signin)
router.post('/signup', post_signup)
router.get('/user', get)
router.put('/user/:id', put)
router.delete('/user/:id', deleteOne)

export default router