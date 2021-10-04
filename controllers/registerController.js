var express = require('express');
var {body, validationResult} = require('express-validator');
var PeoplesDetail = require('../models/peoplesDetail');

var router = express.Router();

/* GET form. */
exports.register_get = function(req, res, next) {
    res.render('Home')
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
        res.render('Home', {
            alert
        })
    } else {
        res.redirect('/id-form');
    }
}
];

 exports.general_info_get = function(req, res, next) {
   res.render('idForm')
};  

/* POST form. */
exports.general_info_post = [

    // Validate and sanitise fields.
    body('idNumber', 'ID must not be empty.').trim().isLength({ min: 13 }).escape(),
    body('passportNumber', 'Must be a passport number').trim().isLength({ min: 1 }).escape(),
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
        // save to database
        const peoplesDetail = new PeoplesDetail(req.body);
        peoplesDetail.save()
        .then((result) => {
            res.redirect('/contact-details');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
}
];

exports.contact_details_get = function(req, res, next) {
    res.render('contactDetails')
 };  
 
 /* POST form. */
 exports.contact_details_post = [
 
     // Validate and sanitise fields.
     body('phone')
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
         res.redirect('/address');
     }
 }
 ];
