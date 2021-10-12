const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peoplesDetailSchema = new Schema({
    idNumber: {
        type: String,
        required: true
    },
    passportNumber: {
        String,
        required: false
    },
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
    contactDetails: {
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String
        }
    },
    address: {
        pronvince: {
            type: String,
            required: true
        },
        manucipality: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        }
    },
    medicailAidDetails: {
        medicalAidName: {
            type: String,
            required: true
        },
        medicalAidNumber: {
            type: String,
            required: true
        }
    }
}, { timestamps: true});

const PeoplesDetail = mongoose.model('PeoplesDetail', peoplesDetailSchema);

module.exports = PeoplesDetail;