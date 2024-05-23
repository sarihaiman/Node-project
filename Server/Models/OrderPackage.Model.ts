import mongoose, { Schema } from 'mongoose';
import date from 'date-and-time';

const datePattern=date.compile('YYYY/MM/DD')
const hourPattern=date.compile('hh:mm')


const OrderPackageModel_schema = new Schema({
    Id: { type: Number },
    Date: { type: datePattern },
    BeginingHour: { type: hourPattern },
    EndHour: { type: hourPattern },
    PackageId: { type: Number },
});

module.exports = mongoose.model("OrderPackage_Model", OrderPackageModel_schema);