import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getallPhotographyPackage, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../Services/PhotographyPackage.service';
import express from 'express';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

export const get = async (req: Request, res: Response) => {
    await getallPhotographyPackage(req, res)
};

export const post = async (req: Request, res: Response) => {
    await addPhotographyPackage(req, res)
}

export const put = async (req: Request, res: Response) => {
    await updatePhotographyPackage(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deletePhotographyPackage(req, res)
}

