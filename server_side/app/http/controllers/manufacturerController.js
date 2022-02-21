const crypto = require('crypto');
const hashService = require('../../../services/hash-service');
const QRCodeService = require('../../../services/qrcode-service');
const smartContractService = require('../../../services/contract-service');

function manufacturerController() {
    return {
        addProduct(req, res) {
            res.render('manufacturer/addProduct');
        },

        postAddProduct(req, res) {
            console.log('Request to /QRCodeForManufacturer\n');
            let { brand, model, description, manufacturerName, manufacturerLocation } = req.body;
            let status = 0;
            let manufacturerTimestamp = new Date(); // Date() gives current timestamp
            manufacturerTimestamp = manufacturerTimestamp.toISOString().slice(0, 10);
            let salt = crypto.randomBytes(20).toString('hex');
            let code = hashService.hashMD5(brand + model + status + description + manufacturerName + manufacturerLocation + salt);
            let ok = smartContractService.createCode(code, brand, model, status, description, manufacturerName, manufacturerLocation,
                manufacturerTimestamp);
            console.log(`Brand: ${brand} \n`);
            if (!ok) {
                return res.status(400).send('ERROR! QR Code for manufacturer could not be generated.');
            }
            console.log(`The QR Code generated is: ${code} \n`);

            QRCodeService.generateQR(code).then((base64QRCode) => {
                console.log(ok);
                return res.render('manufacturer/success', { code, base64QRCode, brand, model, description, manufacturerName, manufacturerLocation });
            }).catch(err => {
                console.error(err);
                return res.status(400).send('ERROR! QR Code for manufacturer could not be generated, Data Saved in blockchain');
            })
        },

        scanShipment(req, res) {
            return res.render('manufacturer/scanShipment')
        },

        postScanShipment(req, res) {
            let { code } = req.body;
            let productDetails = smartContractService.getOwnedCodeDetails(code);

            let productDetailsObj = {
                retailerName: productDetails[0], retailerLocation: productDetails[1]
            };
            console.log(`Code ${code} \n`);
            res.status(200).send(JSON.stringify(productDetailsObj));
        }
    }
}

module.exports = manufacturerController;