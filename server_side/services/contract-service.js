require('dotenv').config();
const Web3 = require('web3');
const Web3EthAbi = require('web3-eth-abi');

// Web3 connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);

const abiArray = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "response",
        "type": "bool"
      }
    ],
    "name": "reportStolenResponse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "response",
        "type": "bool"
      }
    ],
    "name": "reportFoundResponse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "response",
        "type": "bool"
      }
    ],
    "name": "changeOwnerResponse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "response",
        "type": "bool"
      }
    ],
    "name": "initialOwnerResponse",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_brand",
        "type": "string"
      },
      {
        "name": "_model",
        "type": "string"
      },
      {
        "name": "_status",
        "type": "uint256"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_manufactuerName",
        "type": "string"
      },
      {
        "name": "_manufactuerLocation",
        "type": "string"
      },
      {
        "name": "_manufactuerTimestamp",
        "type": "string"
      }
    ],
    "name": "createCode",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getNotOwnedCodeDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getCurrentOwner",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getOwnedCodeDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_hashedEmailRetailer",
        "type": "string"
      }
    ],
    "name": "addRetailerToCode",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_hashedEmail",
        "type": "string"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_phone",
        "type": "string"
      }
    ],
    "name": "createCustomer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getCustomerDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_hashedEmail",
        "type": "string"
      },
      {
        "name": "_retailerName",
        "type": "string"
      },
      {
        "name": "_retailerLocation",
        "type": "string"
      }
    ],
    "name": "createRetailer",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "getRetailerDetails",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_customer",
        "type": "string"
      }
    ],
    "name": "reportStolen",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_customer",
        "type": "string"
      }
    ],
    "name": "reportFound",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_oldCustomer",
        "type": "string"
      },
      {
        "name": "_newCustomer",
        "type": "string"
      }
    ],
    "name": "changeOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_code",
        "type": "string"
      },
      {
        "name": "_retailer",
        "type": "string"
      },
      {
        "name": "_customer",
        "type": "string"
      }
    ],
    "name": "initialOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_customer",
        "type": "string"
      }
    ],
    "name": "getCodes",
    "outputs": [
      {
        "name": "",
        "type": "string[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

const address = process.env.address;

const contract = web3.eth.contract(abiArray);

const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

// // Watch Events
// var reportStolenEvent = contractInstance.reportStolenResponse();
// reportStolenEvent.watch((err, response) => {
//   if(err){
//     console.log(err);
//   }
//   console.log(response);
// })

class SmartContractService {
  // Add the user in Blockchain
  createCustomer(hashedEmail, name, phone) {
    return contractInstance.createCustomer(hashedEmail, name, phone, { from: web3.eth.accounts[0], gas: 3000000 });
  }

  //Add Retailer in Blockchain
  createRetailer(hashedEmail, name, location) {
    return contractInstance.createRetailer(hashedEmail, name, location, { from: web3.eth.accounts[0], gas: 3000000 });
  }

  //Create new product
  createCode(code, brand, model, status, description, manufacturerName, manufacturerLocation, manufacturerTimestamp) {
    return contractInstance.createCode(code, brand, model, status, description, manufacturerName, manufacturerLocation,
      manufacturerTimestamp, { from: web3.eth.accounts[0], gas: 3000000 });
  }

  //Get product details for retailer and customer
  getNotOwnedCodeDetails(code) {
    return contractInstance.getNotOwnedCodeDetails(code);
  }

  //Get product details for manufacturer
  getOwnedCodeDetails(code) {
    return contractInstance.getOwnedCodeDetails(code);
  }

  addRetailerToCode(code, hashedRetailerEmail) {
    console.log(`hashed email: ${hashedRetailerEmail} \n`);
    return contractInstance.addRetailerToCode(code, hashedRetailerEmail);
  }

  initialOwner(code, hashedSellerEmail, hashedBuyerEmail) {
    let transaction_hash = contractInstance.initialOwner(code, hashedSellerEmail, hashedBuyerEmail,
      { from: web3.eth.accounts[0], gas: 3000000 });
    console.log(transaction_hash);
    return { transaction_hash, web3 };
  }

  changeOwner(code, hashedSellerEmail, hashedBuyerEmail) {
    let transaction_hash = contractInstance.changeOwner(code, hashedSellerEmail, hashedBuyerEmail,
      { from: web3.eth.accounts[0], gas: 3000000 });
    console.log(transaction_hash);
    return { transaction_hash, web3 };
  }

  reportStolen(code, hashedEmail) {
    let transaction_hash = contractInstance.reportStolen(code, hashedEmail);
    console.log(transaction_hash);
    return { transaction_hash, web3 };
  }

  reportFound(code, hashedEmail) {
    let transaction_hash = contractInstance.reportFound(code, hashedEmail);
    console.log(transaction_hash);
    return { transaction_hash, web3 };
  }

  getCurrentOwner(code) {
    return contractInstance.getCurrentOwner(code);
  }

  getCodes(email, hashedEmail) {
    let arrayOfCodes = contractInstance.getCodes(hashedEmail);
    console.log(arrayOfCodes);
    console.log(`Email ${email}`);
    console.log(`Customer has these product codes: ${arrayOfCodes} \n`);
    let myAssetsArray = [];
    for(let i = 0; i < arrayOfCodes.length; i++) {
      let code = arrayOfCodes[i];
      console.log(code);
      if(code!='' && code!='hack' && code){
        let ownedCodeDetails = contractInstance.getOwnedCodeDetails(code);
        let notOwnedCodeDetails = contractInstance.getNotOwnedCodeDetails(code);
        let currentOwner = contractInstance.getCurrentOwner(code);
        myAssetsArray.push({
            'code': code, 'brand': notOwnedCodeDetails[0], 'model': notOwnedCodeDetails[1], 'status': notOwnedCodeDetails[2],
            'description': notOwnedCodeDetails[3], 'manufacturerName': notOwnedCodeDetails[4],
            'manufacturerLocation': notOwnedCodeDetails[5], 'manufacturerTimestamp': notOwnedCodeDetails[6],
            'retailerName': ownedCodeDetails[0], 'retailerLocation': ownedCodeDetails[1],
            'retailerTimestamp': ownedCodeDetails[2], 'currentOwner': currentOwner
        });
      }
    }
    return myAssetsArray;
  }

}

module.exports = new SmartContractService();