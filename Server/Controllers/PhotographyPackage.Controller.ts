import fs from 'fs';
import { Response, Request } from 'express';
import PhotographyPackage_Model from '../Models/PhotographyPackage.Model';
import bodyParser from 'body-parser';
// import {getall} from '../Services/PhotographyPackage.service'
import { getallPhotographyPackage, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../Services/PhotographyPackage.service';

const fsPromises = require('fs').promises;
const app = require('express').Router();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requirePhotographyPackage() {

    app.get('/PhotographyPackage/getAll', async (req: Request, res: Response) => {
        await getallPhotographyPackage(req, res)
    });

    app.post('/PhotographyPackage/add', async (req: Request, res: Response) => {
        await addPhotographyPackage(req, res)
    })

    app.put('/PhotographyPackage/update', async (req: Request, res: Response) => {
        await updatePhotographyPackage(req, res);
    })

    app.delete('/PhotographyPackage/delete/:Id', async (req: Request, res: Response) => {
        await deletePhotographyPackage(req, res)
    })

}

requirePhotographyPackage()

export default app;