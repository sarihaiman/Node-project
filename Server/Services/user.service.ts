import { Response, Request } from 'express';
import user_Model from '../Models/user.model';

export const getallUsers = async (req: Request, res: Response) =>{
    const users = await user_Model.find();
    res.send(users)
}

export const addUser = async (req: Request, res: Response) =>{
    try {
        const user = JSON.parse(JSON.stringify(req.body));
        const countUsers = await user_Model.find();
        const newuser = {
            "id": Number(user.id),
            "name": user.name,
            "password": user.password,
            "phone": user.phone,
            "email": user.email,
            "isAdmin": user.isAdmin,
        }
        const length = countUsers.length
        if (length === 0)
            newuser.id = 0;
        else {
            const lengthNow = Number(countUsers[length - 1].id) + 1
            newuser.id = lengthNow
        }
        await user_Model.insertMany(newuser);
        res.send("Post " + user.id + " secceeded")
    } catch (err) {
        res.status(409).send(err);
    }
}

export const updateUser = async (req: Request, res: Response) =>{
    try {
        const id = req.params.id;
        const data = req.body;
        if (await user_Model.findOne({ "id": id }) === null) {
            res.status(404).send('user not found');
            return
        }
        await user_Model.updateOne({
            id: id
        }, {
            $set: {
                name: data.name,
                password: data.password,
                phone: data.phone,
                email: data.email,
            }
        })
        res.send("Update " + id + " secceeded")
    } catch (err) {
        res.status(409).send('error!!!');
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (await user_Model.findOne({ "id": id }) === null) {
            res.status(404).send('user not found');
            return
        }
        await user_Model.deleteOne({ id: id })
    } catch (err) {
        res.status(409).send('error!!!');
    }
    res.send("Delete: " + req.params.id + " secceeded");
}
