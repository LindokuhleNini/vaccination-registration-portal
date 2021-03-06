var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var logger = require('morgan');
var PeoplesDetail = require('./models/peoplesDetail');
var twilio = require('twilio');
var accountSid = 'AC0eb08a4c7a2cb53efa57a769d9987dad';
var authToken = 'db040379cd66eadfc6d75e6c390b5451';
var client = new twilio(accountSid, authToken);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Personal Details

//only data that gets saved to db starts from id number up until gender
// const PeoplesDetail = new mongoose.Schema({
//   idNumber: String,
//   passportNumber: String,
//   dateOfBirth: String,
//   firstName: String,
//   surname: String,
//   gender: String,
//   contactDetails: {
//       phoneNumber: String,
//       email: String
//   },
//   address: {
//       province: String,
//       manucipality: String,
//       street: String
//   },
//   medicailAidDetails: {
//       medicalAidName: String,
//       medicalAidNumber: String
//   }
// });

//all data gets saved to db
// const PeoplesDetail = new mongoose.Schema({
//     phoneNumber: String,
//     idNumber: String,
//     passportNumber: String,
//     dateOfBirth: String,
//     firstName: String,
//     surname: String,
//     gender: String,
//     email: String,
//     province: String,
//     manucipality: String,
//     street: String,
//     medicalAidName: String,
//     medicalAidNumber: String
//   });
  
// connect to mongodb
const dbURI = 'mongodb+srv://lindo:Apple123@cluster0.hokzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(5500)) // listen for requests
    .catch((err) => console.log(err));
    console.log("DB and server Connected");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// render views
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//WhatsApp Chatbot

let generalInformation = mongoose.model('generalInformation', PeoplesDetail.PeoplesDetailWhatsAppSchema);
// Still need to configure a webhook
app.post('/receive-message', (req, res) =>{
  let from = req.body.From;
  let to = req.body.To;
  let body = req.body.Body;

  generalInformation.find({phoneNumber: from}, (err, generalInfo) =>{
    if (generalInfo.length !== 0){
      if (!generalInfo[0].idNumber && !generalInfo[0].passportNumber && !generalInfo[0].dateOfBirth && !generalInfo[0].firstName
        && !generalInfo[0].surname && !generalInfo[0].gender && !generalInfo[0].email && !generalInfo[0].province && !generalInfo[0].manucipality
        && !generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){

          generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"idNumber": body}}, {"new": true, "upsert": true}, () =>{
            client.messages.create({
              to: `${from}`,
              from: `${to}`,
              body: 'What is your passport number?'
            })

            res.end();
          })
        } else if (!generalInfo[0].passportNumber && !generalInfo[0].dateOfBirth && !generalInfo[0].firstName
          && !generalInfo[0].surname && !generalInfo[0].gender && !generalInfo[0].email && !generalInfo[0].province && !generalInfo[0].manucipality
          && !generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
  
            generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"passportNumber": body}}, {"new": true, "upsert": true}, () =>{
              client.messages.create({
                to: `${from}`,
                from: `${to}`,
                body: 'What is your date of birth?'
              })
  
              res.end();
            })
          }else if (!generalInfo[0].dateOfBirth && !generalInfo[0].firstName && !generalInfo[0].surname && !generalInfo[0].gender 
            && !generalInfo[0].email && !generalInfo[0].province && !generalInfo[0].manucipality && !generalInfo[0].street 
            && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
    
              generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"dateOfBirth": body}}, {"new": true, "upsert": true}, () =>{
                client.messages.create({
                  to: `${from}`,
                  from: `${to}`,
                  body: 'What is your first name?'
                })
    
                res.end();
              })
            }else if (!generalInfo[0].firstName && !generalInfo[0].surname && !generalInfo[0].gender 
              && !generalInfo[0].email && !generalInfo[0].province && !generalInfo[0].manucipality && !generalInfo[0].street 
              && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
      
                generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"firstName": body}}, {"new": true, "upsert": true}, () =>{
                  client.messages.create({
                    to: `${from}`,
                    from: `${to}`,
                    body: 'What is your surname?'
                  })
      
                  res.end();
                })
              }else if (!generalInfo[0].surname && !generalInfo[0].gender && !generalInfo[0].email && !generalInfo[0].province 
                && !generalInfo[0].manucipality && !generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
        
                  generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"surname": body}}, {"new": true, "upsert": true}, () =>{
                    client.messages.create({
                      to: `${from}`,
                      from: `${to}`,
                      body: 'What is your gender?'
                    })
        
                    res.end();
                  })
                }else if (!generalInfo[0].gender && !generalInfo[0].email && !generalInfo[0].province 
                  && !generalInfo[0].manucipality && !generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
          
                    generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"gender": body}}, {"new": true, "upsert": true}, () =>{
                      client.messages.create({
                        to: `${from}`,
                        from: `${to}`,
                        body: 'What is your email?'
                      })
          
                      res.end();
                    })
                  }else if (!generalInfo[0].email && !generalInfo[0].province && !generalInfo[0].manucipality && 
                    !generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
            
                      generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"email": body}}, {"new": true, "upsert": true}, () =>{
                        client.messages.create({
                          to: `${from}`,
                          from: `${to}`,
                          body: 'What province you live in?'
                        })
            
                        res.end();
                      })
                    }else if (!generalInfo[0].province && !generalInfo[0].manucipality && 
                      !generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
              
                        generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"province": body}}, {"new": true, "upsert": true}, () =>{
                          client.messages.create({
                            to: `${from}`,
                            from: `${to}`,
                            body: 'What city you live in?'
                          })
              
                          res.end();
                        })
                      }else if (!generalInfo[0].manucipality && !generalInfo[0].street && !generalInfo[0].medicalAidName && 
                        !generalInfo[0].medicalAidNumber){
                
                          generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"manucipality": body}}, {"new": true, "upsert": true}, () =>{
                            client.messages.create({
                              to: `${from}`,
                              from: `${to}`,
                              body: 'What is your house number and street name?'
                            })
                
                            res.end();
                          })
                        }else if (!generalInfo[0].street && !generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
                  
                            generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"street": body}}, {"new": true, "upsert": true}, () =>{
                              client.messages.create({
                                to: `${from}`,
                                from: `${to}`,
                                body: 'What is the name of your medical aid?'
                              })
                  
                              res.end();
                            })
                          }else if (!generalInfo[0].medicalAidName && !generalInfo[0].medicalAidNumber){
                  
                            generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"medicalAidName": body}}, {"new": true, "upsert": true}, () =>{
                              client.messages.create({
                                to: `${from}`,
                                from: `${to}`,
                                body: 'What is your medical aid number?'
                              })
                  
                              res.end();
                            })
                          }else if (!generalInfo[0].medicalAidNumber){
                  
                            generalInformation.findByIdAndUpdate(generalInfo[0]._id, {"$set": {"medicalAidNumber": body}}, {"new": true, "upsert": true}, () =>{
                              client.messages.create({
                                to: `${from}`,
                                from: `${to}`,
                                body: 'You have registered successfully! Have a nice day.'
                              })
                  
                              res.end();
                            })
                          }
    }else{
      if (body === 'Register'){
        let newGeneralInformation = new generalInformation;
        newGeneralInformation.phoneNumber = from;
        newGeneralInformation.save(() => {
          client.messages.create({
            to: `${from}`,
            from: `${to}`,
            body: 'What is your id number'
          })

          res.end();
        })
      }
    }

    res.end();
  })
}) 

module.exports = app;
