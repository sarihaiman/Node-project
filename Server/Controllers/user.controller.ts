import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getallUsers, signup, signin, updateUser, deleteUser } from '../Services/user.service';
import express from 'express';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

export const post_signin = async (req: Request, res: Response) => {
    await signin(req, res)
}

export const post_signup = async (req: Request, res: Response) => {
    await signup(req, res)
}

export const get = async (req: Request, res: Response) => {
    await getallUsers(req, res)
};

export const put = async (req: Request, res: Response) => {
    await updateUser(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deleteUser(req, res)
}

