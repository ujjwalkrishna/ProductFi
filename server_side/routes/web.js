// const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authContoller');
const manufacturerController = require('../app/http/controllers/manufacturerController');
const retailerController = require('../app/http/controllers/retailerController');
const commonController = require('../app/http/controllers/commonController');
const customerController = require('../app/http/controllers/customerController');

//Middelwares
const guest = require('../app/http/middlewares/guest');
// const auth = require('../app/http/middlewares/auth');
// const admin = require('../app/http/middlewares/admin');


function initRoute(app) {
    app.get('/', (req, res) => { res.render('index') });

    app.get('/login', guest, authController().login);

    app.post('/login', authController().postLogin);

    app.get('/register', guest, authController().register);

    app.post('/register', authController().postRegister);

    /* ---------------------------Manufacturer routes------------------------------*/

    app.get('/add-product', manufacturerController().addProduct);

    /*
    * Description: Generates QR codes for the manufacturers and add product to blockchain
    * Request:     POST /add-product
    * Send:        JSON object which contains brand, model, status, description, manufacturerName, manufacturerLocation
    * Receive:     200 if QR code was generated, 400 otherwise.
    */
    app.post('/add-product', manufacturerController().postAddProduct);

    /* Description: Scan shipment for the manufacturers and add show the result */
    app.get('/scan-shipment-mfr', manufacturerController().scanShipment);
    app.post('/scan-shipment-mfr', manufacturerController().postScanShipment);


    /* ---------------------------Retailer routes--------------------------------*/

    app.get('/getOwnerShip', retailerController().getOwnerShip);

    /* Description: Scan shipment for the retailer and give ownership to retailer */
    app.post('/addRetailerToCode', retailerController().addRetailerToCode);

    /* -------------------Product Details for customer & retailer------------------------*/
    app.get('/getProductDetails', commonController().productDetails);
    app.post('/getProductDetails', commonController().postProductDetails);

    app.get('/sell', commonController().sellProduct);
    app.post('/sell', commonController().postSellProduct);


    app.get('/reportStolen', customerController().reportStolen);
    app.post('/reportStolen', customerController().postReportStolen);

    app.get('/reportFound', customerController().reportFound);
    app.post('/reportFound', customerController().postReportFound);

    /**
    * Description: Lists all the assets owned by the user
    * Request:     GET /myAssets
    * Send:        JSON object which contains email(Logged in user)
    * Receive:     JSON array of objects which contain brand, model, description, status, manufacturerName,manufacturerLocation,
    *                                                  manufacturerTimestamp, retailerName, retailerLocation, retailerTimestamp
    */
    app.get('/myAssets', customerController().myAssets);


    app.post('/logout', authController().logout)
}

module.exports = initRoute;