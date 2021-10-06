var express = require('express');
var bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

// Require controller modules.
var register_controller = require('../controllers/registerController');

/* GET home page. */

router.get('/home', register_controller.register_get);
router.post('/home', urlencodedParser, register_controller.register_post);

router.get('/method-of-identification', register_controller.method_of_identification);

router.get('/id-form', register_controller.general_info_get);
router.post('/id-form', urlencodedParser, register_controller.general_info_post);

router.get('/contact-details', register_controller.contact_details_get);
router.post('/contact-details', urlencodedParser, register_controller.contact_details_post);

router.get('/address', register_controller.address);

router.get('/appointment-preference', register_controller.appointment_preference);

router.get('/medical-aid', register_controller.medical_aid);

router.get('/medical-aid-details', register_controller.medical_aid_details);

router.get('/successful-registration', register_controller.successful_registration);

router.get('/error', register_controller.errors);


module.exports = router;
