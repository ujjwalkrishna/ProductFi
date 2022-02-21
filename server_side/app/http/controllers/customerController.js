const Web3EthAbi = require('web3-eth-abi');
const hashService = require('../../../services/hash-service');
const smartContractService = require('../../../services/contract-service');

function customerController() {
    return {
        reportStolen(req, res) {
            res.render('customer/reportStolen');
        },

        postReportStolen(req, res) {
            let { code } = req.body;
            let customerEmail = req.user.email;
            let customerHashedEmail = hashService.hashMD5(customerEmail);

            let { transaction_hash, web3 } = smartContractService.reportStolen(code, customerHashedEmail);
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

                    if (resp) {
                        return res.json({ 'msg': 'Stolen Reported' });
                    } else {
                        return res.json({ 'msg': 'You have no access to mark it stolen' });
                    }
                }
            })
        },

        reportFound(req, res) {
            res.render('customer/reportFound');
        },

        postReportFound(req, res) {
            let { code } = req.body;
            let customerEmail = req.user.email;
            let customerHashedEmail = hashService.hashMD5(customerEmail);

            let { transaction_hash, web3 } = smartContractService.reportFound(code, customerHashedEmail);
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

                    if (resp) {
                        return res.json({ 'msg': 'Found Reported' });
                    } else {
                        return res.json({ 'msg': 'You have no access to mark it found' });
                    }
                }
            })
        },

        myAssets(req, res) {
            let { email } = req.user;
            let hashedEmail = hashService.hashMD5(email);
            let arr = smartContractService.getCodes(email, hashedEmail);
            return res.json({'Assets': arr});
        }
    }
}

module.exports = customerController;