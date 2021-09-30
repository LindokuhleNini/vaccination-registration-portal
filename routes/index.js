var express = require('express');
var bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home');
});

router.get('/home', function(req, res, next) {
  res.render('Home');
});

router.get('/method-of-identification', function(req, res, next) {
  res.render('IdOrPassport');
});

router.get('/id-form', register_controller.general_info_get);
router.post('/id-form', urlencodedParser, register_controller.general_info_post);

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
