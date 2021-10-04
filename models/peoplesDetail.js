const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peoplesDetailSchema = new Schema({
    idNumber: {
        type: String,
        required: true
    },
    passportNumber: String,
    dateOfBirth:{
        type: Date,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }, 
}, { timestamps: true});

const PeoplesDetail = mongoose.model('PeoplesDetail', peoplesDetailSchema);

module.exports = PeoplesDetail;