import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getallUsers, addUser, updateUser, deleteUser } from '../Services/user.service';
import express from 'express';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

export const get = async (req: Request, res: Response) => {
    await getallUsers(req, res)
};

export const post = async (req: Request, res: Response) => {
    await addUser(req, res)
}

export const put = async (req: Request, res: Response) => {
    await updateUser(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deleteUser(req, res)
}

