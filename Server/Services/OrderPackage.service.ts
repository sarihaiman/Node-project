import { Response, Request } from 'express';
const OrderPackage_Model=require('../Models/OrderPackage.Model')

// export const getallPhotographyPackage = async function (req: Request, res: Response) {
//     const PhotographyPackage = await PhotographyPackage_Model.find();
//     res.send(PhotographyPackage)
// }

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
        res.status(409).send(err);
    }
}

// export const updatePhotographyPackage = async function (req: Request, res: Response) {
//     try {
//         const id = Number(req.body.Id);
//         const data = req.body;
//         if (await PhotographyPackage_Model.findOne({ "Id": id }) === null) {
//             res.status(404).send('PhotographyPackage not found');
//             return
//         }
//         await PhotographyPackage_Model.updateOne({
//             Id: id
//         }, {
//             $set: {
//                 Type: Number(data.Type),
//                 MoneyToHour: Number(data.MoneyToHour)
//             }
//         })
//         res.send("Update " + id + " secceeded")
//     } catch (err) {
//         res.status(409).send('error!!!');
//     }
// }

// export const deletePhotographyPackage = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.Id;
//         if (await PhotographyPackage_Model.findOne({ "Id": id }) === null) {
//             res.status(404).send('PhotographyPackage not found');
//             return
//         }
//         await PhotographyPackage_Model.deleteOne({ Id: id })
//     } catch (err) {
//         res.status(409).send('error!!!');
//     }
//     res.send("Delete: " + req.params.Id + " secceeded");
// }
