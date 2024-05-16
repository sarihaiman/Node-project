import fs from 'fs';
const fsPromises = require('fs').promises;

const app = require('express').Router();
import bodyParser from 'body-parser';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const PhotographyPackage_Model=require('../Models/PhotographyPackage.Model');

async function requireCategories() {

    app.get('/PhotographyPackage', async(req:Request, res:Response) => {
        const PhotographyPackage=await PhotographyPackage_Model.find();
        PhotographyPackage.forEach((c: any)=> {
            console.log(c);
        });
    });
}

requireCategories()

export default app;