import fs from 'fs';
import { Response, Request } from 'express';
import PhotographyPackage_Model from '../Models/PhotographyPackage.Model';
import bodyParser from 'body-parser';

const fsPromises = require('fs').promises;
const app = require('express').Router();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requirePhotographyPackage() {

    app.get('/PhotographyPackage/getAll', async(req:Request, res:Response) => {
        const PhotographyPackage=await PhotographyPackage_Model.find();
        res.send(PhotographyPackage)
    });

    app.post('/PhotographyPackage/add', async (req:Request, res:Response) => {
        try {
            let PhotographyPackage = JSON.parse(JSON.stringify(req.body));
            const countPhotographyPackage=await PhotographyPackage_Model.find();
            const newPhotographyPackage = {
                "Id":  Number(PhotographyPackage.Id),
                "Type":  Number(PhotographyPackage.Type),
                "MoneyToHour":  Number(PhotographyPackage.MoneyToHour),
            }
            let length=countPhotographyPackage.length
            if(length==0)
                newPhotographyPackage.Id=0;
            else
            {
                let lengthNow=Number(countPhotographyPackage[length-1].Id)+1
                newPhotographyPackage.Id=lengthNow
            }
            PhotographyPackage_Model.insertMany(newPhotographyPackage);
            res.send("Post " + PhotographyPackage.Id +" secceeded");
        } catch (err) {
            res.status(409).send(err);
        }
    })

    app.put('/PhotographyPackage/update', async (req:Request, res:Response) => {
        try {
            let id = Number(req.body.Id);
            let data = req.body;
            if(await PhotographyPackage_Model.findOne({"Id": id})==null)
                res.status(404).send('PhotographyPackage not found');
            await PhotographyPackage_Model.updateOne({
                Id:id
            },{
            $set:{
                Type:  Number(data.Type),
                MoneyToHour:  Number(data.MoneyToHour)
            }})
            res.send("Update " + id + " secceeded")
        } catch (err) {
            res.status(409).send('error!!!');
        }
    })

    app.delete('/PhotographyPackage/delete/:Id', async(req:Request, res:Response) => {
        try {
            const id = req.params.Id;
            if(await PhotographyPackage_Model.findOne({Id: id})==null)
                res.status(404).send('PhotographyPackage not found');
        } catch (err) {
            res.status(409).send('error!!!');
        }
        res.send("Delete: " + req.params.Id + " secceeded");
    })

}

requirePhotographyPackage()

export default app;