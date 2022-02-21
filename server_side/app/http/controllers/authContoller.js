const passport = require('passport');
const connection = require('../../config/database');
const hashService = require('../../../services/hash-service');
const smartContractService = require('../../../services/contract-service');

function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },

        postLogin(req, res, next) {
            // here err, user, info is coming from passport.js where in done() function we have provided null, false/user , message
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                // when user exists and password matches then login the user using login method;
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }
                    // console.log(req.user);
                    // console.log(req.user.role);
                    return res.json({ 'msg': 'Done' });
                    // if (req.user.role == 'admin')
                    //     // return res.redirect('/admin/orders');
                    //     return res.json({'msg':'Done'})
                    // else {
                    //     // return res.redirect('/customer/orders');
                    //     return res.json({'msg':'Error'})
                    // }
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('auth/register');
        },

        async postRegister(req, res) {
            console.log('Request to /signUp\n');
            let { name, email, location, phone, password, role } = req.body;
            let hashedPassword = hashService.hashBcrypt(password);
            console.log(`Email: ${email} \n`);

            // Adding the user in MySQL
            connection.query('SELECT * FROM USER WHERE Email = ? AND Role = ? LIMIT 1', [email, role], (error, results) => {
                if (error) {
                    callback(error);
                    return res.status(400);
                }
                if (results.length) {
                    return res.status(400).send('Email already exists!');
                }
                connection.query('INSERT INTO USER VALUES (?,?,?,?,?,?)', [name, email, hashedPassword, location, phone, role], (error, results) => {
                    if (error) {
                        //callback(error);
                        console.log(error);
                        return res.status(400);
                    }
                    res.status(200).send('Signup successful!');
                    
                    // Adding user to the Blockchain
                    if (role != "manufacturer") {
                        hashedEmail = hashService.hashMD5(email);
                        let ok = role == "customer" ? smartContractService.createCustomer(hashedEmail, name, phone)
                            : smartContractService.createRetailer(hashedEmail, name, location)
                        if (ok) {
                            console.log(`${role} ${hashedEmail} successfully added to Blockchain!\n`);
                        } else {
                            console.log('ERROR! User could not be added to Blockchain.\n');
                        }
                    }
                });
            });
        },

        logout(req, res) {
            req.logout();
            delete req.session.cart;
            return res.redirect('/');
        }
    }
}

module.exports = authController;