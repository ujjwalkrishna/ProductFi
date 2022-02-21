const hashService = require('../../../services/hash-service');
const smartContractService = require('../../../services/contract-service');

function retailerController() {
    return {
        getOwnerShip(req, res) {
            return res.render('retailer/takeOwnerShip')
        },

        addRetailerToCode(req, res) {
            let { code } = req.body;
            let retailerEmail = req.user.email;
            let hashedRetailerEmail = hashService.hashMD5(retailerEmail);

            let ok = smartContractService.addRetailerToCode(code, hashedRetailerEmail);
            if (!ok) {
                return res.status(400).send('Error');
            }
            console.log(`Successfully added ${retailerEmail} to code ${code} \n`);
            return res.status(200).send('Success');
        }
    }
}

module.exports = retailerController;