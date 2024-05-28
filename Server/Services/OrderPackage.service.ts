import { Response, Request } from 'express';
import PhotographyPackage_Model from '../Models/PhotographyPackage.Model';
import OrderPackage_Model from '../Models/OrderPackage.Model';
import date from 'date-and-time';

const datePattern = date.compile('YYYY/MM/DD')
const hourPattern = date.compile('hh:mm')

export const getallOrderPackage = async function (req: Request, res: Response) {
    const PhotographyPackage = await OrderPackage_Model.find();
    res.send(PhotographyPackage)
}

export const addOrderPackage = async function (req: Request, res: Response) {
    try {
        const OrderPackage = JSON.parse(JSON.stringify(req.body));
        const countOrderPackage = await OrderPackage_Model.find();
        const newOrderPackage = {
            "Id": Number(OrderPackage.Id),
            "Date": Array(OrderPackage.Date),
            "BeginingHour": Array(OrderPackage.BeginingHour),
            "EndHour": Array(OrderPackage.EndHour),
            "PackageId": Number(OrderPackage.PackageId),
        }
        await isCorrect(newOrderPackage)
        const length = countOrderPackage.length
        if (length === 0)
            newOrderPackage.Id = 0;
        else {
            const lengthNow = Number(countOrderPackage[length - 1].Id) + 1
            newOrderPackage.Id = lengthNow
        }
        await OrderPackage_Model.insertMany(newOrderPackage);
        res.send("Post " + OrderPackage.Id + " secceeded")
    } catch (err) {
        res.status(409).send("" + err);
    }
}

export const updateOrderPackage = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.Id);
        const data = req.body;
        const newOrderPackage = {
            "Id": Number(id),
            "Date": Array(data.Date),
            "BeginingHour": Array(data.BeginingHour),
            "EndHour": Array(data.EndHour),
            "PackageId": Number(data.PackageId)
        }
        await isCorrect(newOrderPackage)
        await OrderPackage_Model.updateOne({
            Id: id
        }, {
            $set: {
                Date: Number(data.Date),
                BeginingHour: Number(data.BeginingHour),
                EndHour: Number(data.EndHour),
                PackageId: Number(data.PackageId)
            }
        })
        res.send("Update " + id + " secceeded")
    }
    catch (err) {
        res.status(409).send('' + err);
    }
}

export const deleteOrderPackage = async (req: Request, res: Response) => {
    try {
        const id = req.params.Id;
        if (await OrderPackage_Model.findOne({ "Id": id }) === null) {
            res.status(404).send('OrderPackage not found');
            return
        }
        await OrderPackage_Model.deleteOne({ Id: id })
    } catch (err) {
        res.status(409).send('error!!!');
    }
    res.send("Delete: " + req.params.Id + " secceeded");
}

const isCorrect = async (newOrderPackage: any) => {
    if (await PhotographyPackage_Model.findOne({ "Id": newOrderPackage.PackageId }) === null) {
        throw new Error("error PackageId")
    }
    if (!(date.isValid(newOrderPackage.BeginingHour, hourPattern))) {
        throw new Error("error BeginingHour")
    }
    if (!date.isValid(newOrderPackage.EndHour, hourPattern)) {
        throw new Error("error EndHour")
    }
    if (!date.isValid(newOrderPackage.Date, datePattern)) {
        throw new Error("error Date")
    }
    if (!(newOrderPackage.EndHour > newOrderPackage.BeginingHour)) {
        throw new Error("error Hours")
    }
    if (newOrderPackage.Date < date.format(new Date(), datePattern)) {
        throw new Error("error - Date pass")
    }
    const equalsDate = await OrderPackage_Model.find({ "Date": newOrderPackage.Date })
    equalsDate.sort(function (a: any, b: any) { return a.BeginingHour < b.BeginingHour ? -1 : 1 });
    equalsDate.forEach((e: any) => {
        if (e['EndHour'] > newOrderPackage.BeginingHour) {
            if (!(e['BeginingHour'] > newOrderPackage.EndHour)) {
                throw new Error("the hours is not available")
            }
        }
    });
}
