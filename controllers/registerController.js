var express = require('express');
var {body, validationResult} = require('express-validator');
var PeoplesDetail = require('../models/peoplesDetail');

var router = express.Router();

// Global variables
var IdNumber;
var PassportNumber;
var DateOfBirth;
var FirstName;
var Surname;
var Gender;
var PhoneNumber;
var Pronvice;
var Email;
var Manucipality;
var Street;

/* GET form. */
exports.register_get = function(req, res, next) {
    res.render('home')
 }; 

 /* POST form. */
exports.register_post = [

    // Validate and sanitise fields.
    body('age', 'Age must not be empty').trim().isLength({ min: 1 }).escape(),
    body('age', 'You must be 18 or older.').trim().contains('2').escape(),
 
 // Process request after validation and sanitization.
 (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('home', {
            alert
        })
    } else {
        res.redirect('/method-of-identification');
    }
}
];

exports.method_of_identification = function(req, res, next) {
    res.render('IdOrPassport');
  };

 exports.general_info_get = function(req, res, next) {
   res.render('idForm')
};  

/* POST form. */
exports.general_info_post = [

    // Validate and sanitise fields.
    body('idNumber', 'ID must not be empty.').trim().isLength({ min: 13 }).escape(),
    //body('passportNumber', 'Must be a passport number').trim().isLength({ min: 1 }).escape(),
    body('dateOfBirth', 'Date of birth must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('firstName', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('surname', 'Surname must not be empty').trim().isLength({ min: 1 }).escape(),
    body('gender', 'Choose gender').trim().isLength({ min: 1 }).escape(),
    // body('check', '').trim().isBoolean('true').escape(),
 
 // Process request after validation and sanitization.
 (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('idForm', {
            alert
        })
    } else {
        IdNumber = req.body.idNumber;
        PassportNumber = req.body.passportNumber;
        DateOfBirth = req.body.dateOfBirth;
        FirstName = req.body.firstName;
        Surname = req.body.surname;
        Gender = req.body.gender;
        res.redirect('/contact-details')
    }
    
}
];

exports.contact_details_get = function(req, res, next) {
    res.render('contactDetails')
 };  
 
 /* POST form. */
 exports.contact_details_post = [
 
     // Validate and sanitise fields.
     body('phoneNumber')
            .not()
            .isEmpty()
            .withMessage('Mobile number is required'),
        body('email', 'Email is required')
            .isEmail(),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         // return res.status(422).jsonp(errors.array())
         const alert = errors.array()
         res.render('contactDetails', {
             alert
         })
     } else {
         PhoneNumber = req.body.phoneNumber;
         Email = req.body.email;
         res.redirect('/address');
     }
 }
 ];

 exports.address = function(req, res, next) {
    res.render('address');
  };

  exports.address_post = [
 
    // Validate fields.
    body('province')
           .not()
           .isEmpty()
           .withMessage('Province is required'),
    body('province')
           .not()
           .isEmpty()
           .withMessage('Province is required'),
    body('street')
            .not()
            .isEmpty()
            .withMessage('Street is required'),

 // Process request after validation and sanitization.
 (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('address', {
            alert
        })
    } else {
        Pronvice = req.body.pronvice;
        Manucipality = req.body.manucipality;
        Street = req.body.street;
        res.redirect('/appointment-preference');
    }
}
];

  exports.appointment_preference = function(req, res, next) {
    res.render('appointmentPreference');
  };

  exports.medical_aid = function(req, res, next) {
    res.render('medicalAid');
  };

  exports.medical_aid_details = function(req, res, next) {
    res.render('medicalAidDetails');
  };

  exports.person_details_post = [
      // code required for medical aid validation
      
    (req, res, next) => {
        const peoplesDetail = new PeoplesDetail({
            idNumber: IdNumber,
            passportNumber: PassportNumber,
            dateOfBirth: DateOfBirth,
            firstName: FirstName,
            surname: Surname,
            gender: Gender,
            contactDetails: {
                phoneNumber: PhoneNumber,
                email: Email
            },
            address: {
                pronvince: Pronvice,
                manucipality: Manucipality,
                street: Street
            },
            medicailAidDetails: {
                medicalAidName: req.body.medicalAidName,
                medicalAidNumber: req.body.medicalAidNumber
            }
        });
        peoplesDetail.save()
        .then((result) => {
            res.redirect('/successful-registration');
        })
        .catch((err) => {
            console.log(err);
        })
    }
];

  exports.successful_registration = function(req, res, next) {
    res.render('successfulRegistration');
  };

  exports.errors = function(req, res, next) {
    res.render('error');
  };
