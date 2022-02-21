require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Secret ID for session
const secret_id = process.env.secret;

// Salt for hashing
const saltRounds = 10;

// IP and port
const IP = 'localhost';
const port = process.env.PORT || 8080;

// Body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Session Config
app.use(session({
  secret: secret_id,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000*60*60*24}  // 24 hours
}))

//Initialize passsport
const passportInit = require('./app/config/passport');
passportInit(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Middleware to use session and user(if logged in) in client side
app.use((req, res, next)=>{
  res.locals.session = req.session;
  res.locals.user = req.user
  next();
});

//Assets
app.use(express.static('public'));

//Set Template Engine
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Set Route
require('./routes/web.js')(app);

// Server start
app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}...\n`);
});
