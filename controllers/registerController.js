var express = require('express');
var {body, validationResult} = require('express-validator');

var router = express.Router();

/* GET form. */
exports.general_info_get = function(req, res, next) {
   res.render('idForm')
}; 

/* POST form. */
exports.general_info_post = [

    // Validate and sanitise fields.
    body('id', 'ID must not be empty.').trim().isLength({ min: 13 }).escape(),
    body('passport', 'Must be a passport number').trim().isLength({ min: 1 }).escape(),
    body('dob', 'Date of birth must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('surname', 'Surname must not be empty').trim().isLength({ min: 1 }).escape(),
    body('gender', 'Choose gender').trim().isLength({ min: 1 }).escape(),
 
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
        res.redirect('/contact-details');
    }
}
];


