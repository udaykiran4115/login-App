var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport')
var flash = require('connect-flash')

//conect to dataBase
mongoose.connect('mongodb://localhost/test');
require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave: true
}))
//initialize the passport function
app.use(passport.initialize());
//passport uses previous session
app.use(passport.session());
//to make sure all of our flash messages are udated
app.use(flash())

app.set('view engine', 'ejs')

require('./app/route.js')(app, passport)
/*app.use('/', function (req, res){
  res.send("Here is our First EXpress program...")
  console.log(req.cookie)
  console.log("######################################################")
  console.log(req.session)
})
*/
app.listen(port)
console.log("Server listening at port "+port)
