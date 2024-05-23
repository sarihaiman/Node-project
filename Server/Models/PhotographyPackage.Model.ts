import { Schema } from 'mongoose';
import mongoose from '../Services/db.services';

enum PhotographyPackage {'Chalake','NewBorn','SmathCake','Family','Children'}

const PhotographyPackage_schema = new Schema({
    Id: { type: Number },
    Type: { type: Number ,enum: PhotographyPackage},
    MoneyToHour: { type: Number }
});

export default mongoose.model("PhotographyPackage_model", PhotographyPackage_schema);