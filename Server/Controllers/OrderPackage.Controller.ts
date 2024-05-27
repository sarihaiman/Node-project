import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { addOrderPackage } from '../Services/OrderPackage.service';
import express from 'express';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requireOrderPackage() {

    // app.get('/PhotographyPackage/getAll', async (req: Request, res: Response) => {
    //     await getallPhotographyPackage(req, res)
    // });

    app.post('/OrderPackage/add', async (req: Request, res: Response) => {
        await addOrderPackage(req, res)
    })

    // app.put('/PhotographyPackage/update', async (req: Request, res: Response) => {
    //     await updatePhotographyPackage(req, res);
    // })

    // app.delete('/PhotographyPackage/delete/:Id', async (req: Request, res: Response) => {
    //     await deletePhotographyPackage(req, res)
    // })

}

requireOrderPackage()

export default app;