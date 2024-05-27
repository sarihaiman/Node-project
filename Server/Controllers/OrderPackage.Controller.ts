import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { addOrderPackage, getallOrderPackage, updateOrderPackage, deleteOrderPackage } from '../Services/OrderPackage.service';
import express from 'express';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

export const get = async (req: Request, res: Response) => {
    await getallOrderPackage(req, res)
}

export const post = async (req: Request, res: Response) => {
    await addOrderPackage(req, res)
}

export const put = async (req: Request, res: Response) => {
    await updateOrderPackage(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deleteOrderPackage(req, res)
}
