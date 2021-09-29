var express = require('express');
var bodyParser = require('body-parser');
var {body, validationResult} = require('express-validator');

var router = express.Router();
var jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Require controller modules.
var register_controller = require('../controllers/registerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/test', function(req, res, next) {
  res.render('test');
});

router.get('/home', function(req, res, next) {
  res.render('Home');
});

router.get('/method-of-identification', function(req, res, next) {
  res.render('IdOrPassport');
});

router.get('/id-form', register_controller.general_info_get);

router.get('/id-form', urlencodedParser, register_controller.general_info_post);

router.get('/contact-details', function(req, res, next) {
  res.render('contactDetails');
});

router.get('/address', function(req, res, next) {
  res.render('Address');
});

router.get('/appointment-preference', function(req, res, next) {
  res.render('appointmentPreference');
});

router.get('/medical-aid', function(req, res, next) {
  res.render('medicalAid');
});

router.get('/medical-aid-details', function(req, res, next) {
  res.render('medicalAidDetails');
});

router.get('/successful-registration', function(req, res, next) {
  res.render('successfulRegistration');
});

router.get('/error', function(req, res, next) {
  res.render('error');
});


module.exports = router;
