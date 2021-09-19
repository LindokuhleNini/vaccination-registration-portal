var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/home', function(req, res, next) {
  res.render('Home');
});

router.get('/id', function(req, res, next) {
  res.render('IdOrPassport');
});

router.get('/idform', function(req, res, next) {
  res.render('IdForm');
});

router.get('/contact', function(req, res, next) {
  res.render('contactDetails');
});

router.get('/address', function(req, res, next) {
  res.render('Address');
});

router.get('/medicalaid', function(req, res, next) {
  res.render('medicalAid');
});

router.get('/madetails', function(req, res, next) {
  res.render('medicalAidDetails');
});

router.get('/done', function(req, res, next) {
  res.render('successfulRegistration');
});


module.exports = router;
