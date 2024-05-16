import mongoose, { Schema } from 'mongoose';

const PhotographyMeeting_schema = new Schema({
    BeginingHour: { type: Number },
    EndHour: { type: Number },
    Date: { type: Date },
});

module.exports = mongoose.model("PhotographyMeeting_model", PhotographyMeeting_schema);