const LocalStrategy = require('passport-local').Strategy
const connection = require('./database');
const bcrypt = require('bcrypt');

function passportInit(passport){
     passport.use(new LocalStrategy({
         usernameField: 'email', 
         passwordField: 'password', 
         passReqToCallback: true
     }, async(req, email, password, done)=>{
         //Check if user exists or not (Login)
         let role = req.body.role
         connection.query('SELECT * FROM USER WHERE Email = ? AND Role = ? LIMIT 1', [email, role], (error, results) => {
            if (error) {
                //callback(error);
                return done(null, false, {message: 'Some error in logging in'});
            }

            if (!results.length) {
                return done(null, false, {message: 'No user with this email'});
            }

            bcrypt.compare(password, results[0].password).then((match)=>{     // here match returns true or false
                if(match)
                   return done(null, results[0], {message: 'Logged in successfully'});
   
                return done(null, false, {message: 'Username or password is incorrect'});
            }).catch((err)=>{
                return done(null, false, {message: 'Something went wrong'});
            })
         });
     }));
     
     // to know whether user is logged in or not
     passport.serializeUser((user, done)=>{
         done(null, user)   // second parameter to store in session to know whether user is logged in or not
     })
     
    
     // to receive whatever we have stored in session using passport.serializeUser, here we have stored user._id so we will receive that
     // we deserialize so that we can use req.user to know who is current user in our backend;
     passport.deserializeUser((user, done)=>{
         done(null, user);
     })
    
}

module.exports = passportInit