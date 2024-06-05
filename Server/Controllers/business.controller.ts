import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import {  getBusinessDetails, updateBusinessDetails } from '../Services/business.service';
import express from 'express';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

export const get = async (req: Request, res: Response) => {
    await getBusinessDetails(req, res)
}

export const put = async (req: Request, res: Response) => {
    await updateBusinessDetails(req, res);
}

