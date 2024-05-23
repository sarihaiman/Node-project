import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getallPhotographyPackage, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../Services/PhotographyPackage.service';
import express from 'express';
const app = express()

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