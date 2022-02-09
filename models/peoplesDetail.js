const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peoplesDetailSchema = new Schema({
    contactDetails: {
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String
        }
    },
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
    address: {
        province: {
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

const PeoplesDetailWhatsAppSchema = new mongoose.Schema({
    phoneNumber: String,
    idNumber: String,
    passportNumber: String,
    dateOfBirth: String,
    firstName: String,
    surname: String,
    gender: String,
    email: String,
    province: String,
    manucipality: String,
    street: String,
    medicalAidName: String,
    medicalAidNumber: String
  });

//const PeoplesDetail = mongoose.model('PeoplesDetail', peoplesDetailSchema);

//module.exports = PeoplesDetail;
module.exports = {
    peoplesDetailSchema,
    PeoplesDetailWhatsAppSchema
}