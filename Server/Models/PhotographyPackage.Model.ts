import { Schema } from 'mongoose';
import mongoose from '../Services/db.services';

enum PhotographyPackage { 'Chalake', 'NewBorn', 'SmathCake', 'Family', 'Children' }

const PhotographyPackage_schema = new Schema({
    id: { type: Number },
    type: { type: Number, enum: PhotographyPackage },
    moneyToHour: { type: Number }
});

export default mongoose.model("PhotographyPackage_model", PhotographyPackage_schema);