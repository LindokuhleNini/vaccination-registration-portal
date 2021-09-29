var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var {body, validationResult} = require('express-validator');

var router = express.Router();
var jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* GET form. */
/* exports.general_info_get = function(req, res, next) {
  res.render('idForm')
}; 

app.post('/id-form', urlencodedParser, [
  body('id', 'ID must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('passport', '').trim().optional().escape(),
    body('dob', 'Date of birth must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('surname', 'Surname must not be empty').trim().isLength({ min: 1 }).escape(),
    body('gender', 'Choose gender').trim().isLength({ min: 1 }).escape(),

],// Process request after validation and sanitization.
(req, res, next) => {

   // Extract the validation errors from a request.
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
     // return res.status(422).jsonp(errors.array())
     res.render('contactDetails')
 }
   else {
       // Data from form is valid. Save book.
      
   }
}) */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
