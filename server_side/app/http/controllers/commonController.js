const Web3EthAbi = require('web3-eth-abi');
const hashService = require('../../../services/hash-service');
const smartContractService = require('../../../services/contract-service');

function commonController() {
    return {
        productDetails(req, res) {
            res.render('productDetails');
        },

        postProductDetails(req, res) {
            let { code } = req.body;
            let ownedCodeDetails = smartContractService.getOwnedCodeDetails(code);
            let notOwnedCodeDetails = smartContractService.getNotOwnedCodeDetails(code);
            let currentOwner = smartContractService.getCurrentOwner(code);
            if (!ownedCodeDetails || !notOwnedCodeDetails) {
                return res.status(400).send('Could not retrieve product details.');
            }
            let productDetails = {
                'brand': notOwnedCodeDetails[0], 'model': notOwnedCodeDetails[1], 'status': notOwnedCodeDetails[2],
                'description': notOwnedCodeDetails[3], 'manufacturerName': notOwnedCodeDetails[4],
                'manufacturerLocation': notOwnedCodeDetails[5], 'manufacturerTimestamp': notOwnedCodeDetails[6],
                'retailerName': ownedCodeDetails[0], 'retailerLocation': ownedCodeDetails[1],
                'retailerTimestamp': ownedCodeDetails[2], 'currentOwner': currentOwner
            };
            console.log('QRCode matched\n');
            return res.status(200).send(JSON.parse(JSON.stringify(productDetails)));
        },

        sellProduct(req, res) {
            res.render('sellProduct');
        },

        postSellProduct(req, res) {
            let { code, buyerEmail } = req.body;
            let { email, role } = req.user;
            let hashedBuyerEmail = hashService.hashMD5(buyerEmail);
            let hashedSellerEmail = hashService.hashMD5(email);
            let transaction_hash, web3;
            if(role == "retailer"){
                let obj = smartContractService.initialOwner(code, hashedSellerEmail, hashedBuyerEmail);
                transaction_hash = obj.transaction_hash,
                web3 = obj.web3;
            }else{
                let obj = smartContractService.changeOwner(code, hashedSellerEmail, hashedBuyerEmail);
                transaction_hash = obj.transaction_hash,
                web3 = obj.web3;
            }
            web3.eth.getTransactionReceipt(transaction_hash, (err, response) => {
                if (err) {
                    return res.json({ 'msg': 'Something went wrong' });
                } else {
                    let hexString = response.logs[0].data;
                    let topics = response.logs[0].topics;
                    let resp = Web3EthAbi.decodeLog([{
                        "indexed": false,
                        "name": "response",
                        "type": "bool"
                    }], hexString, topics).response;

                    console.log(resp);
                    if (resp) {
                        return res.json({ 'msg': `Ok, Sold product to ${buyerEmail}` });
                    } else {
                        return res.json({ 'msg': 'You aure not authorized to sell this product' });
                    }
                }
            })
        }
    }
}

module.exports = commonController;