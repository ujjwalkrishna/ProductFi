<div align="center">

  ![ProductFi](https://bit.ly/3BzBrS5)

</div>

---

<p align="center">A blockchain-based Product Ownership Management System for anti-counterfeits in the Post Supply Chain.</p>

# Table of Contents
+ [About](#description)
+ [Getting Started](#getting_started)
+ [Limitations](#limitations)
+ [Future Scope](#future_scope)

## About <a name="description"></a>
+ In today’s world, how do you know if you are buying a genuine product?
+ For more than a decade now, RFID (Radio Frequency IDentification) technology has been quite effective in providing anti-counterfeits measures in the supply chain.
+ We leverage the idea of Bitcoin’s blockchain that anyone can check the proof of possession of balance. Along with this, we plan to use QR codes.
+ We plan to implement a proof-of-concept system employing a blockchain-based decentralized application which gives a customer the entire history of a product (eg - brand info, owner, etc).
+ With the projected POMS, a consumer can reject the buying of counterfeits by scanning a QR code, if the seller does not have their proprietorship.

### Data Flow
![Data Flow](https://imgur.com/VGIPtDU.png)

### Features
+ Manufacturers can add the product on this platform and QR code of product will be genrated which he can attached with product item.
+ Retailers can scan the product and verify its authenticity by scanning the QR code on this platfrom and then buy the product from distributor. Ownership will be transferred to retailer once he buy it.
+ Customer can scan the product and get its whole details from manufacturing to delivery and then can buy the product. Ownership will be transferred to customer.
+ If the product is stolen then customer can report it on our plaform and then status of product will be marked as stolen and no one will buy it.
+ Customer can sell the product to other customer and transfer the ownership.


### Why blockchain? <a name="why_blockchain"></a>
+ Unlike a normal database, Blockchain has a non-destructive (immutable) way to track data changes over time. This means that data is not editable rather, whenever updates are made, a new block is added to the “block-chain”. This helps track historical data (authenticity and owner data) of a product.
+ Given the amount of data to be dealt with (large amount of products being developed), if we have to keep track of all of them, it is better to have a decentralized and distributed network of nodes so that no entity can tamper with the product data and we also obtain 100% up time.
+ Transparent nature of the Blockchain helps avoid [parallel trade](https://en.wikipedia.org/wiki/Parallel_import).
+ Using Blockchain, authenticity can be checked and ownership of a product can be transferred _decades_ from now; even if the product is discontinued.


### Installing
A step by step series of examples that tell you how to get a development env running

Cloning the repo
```
$ git clone https://github.com/ujjwalkrishna/ProductFi.git
```
Installing the dependencies
```
$ cd ProductFi/server_side
$ npm install
```
Running the server
```
$ node server.js
```

## Built With <a name="built_with"></a>

Blockchain:
+ [Ethereum](https://www.ethereum.org/) - Blockchain Network
+ [Solidity](https://github.com/ethereum/solidity) - Smart Contracts
+ [Ganache](https://truffleframework.com/ganache) - Create private Ethereum blockchain to run tests

Website:
+ HTML - Markup language for creating web pages
+ CSS - Style Sheet Language
+ EJS - Scripting Language for web pages
+ Bootstrap - Templating
+ Nodejs - Handle client requests

## Limitations <a name="limitations"></a>
+ We currently depend on the company to register with our services, without which, we cannot provide information about a brand to the user.

<!-- CONTACT -->
## Contact

Krishna Ujjwal - [@linkedin_ujjwalkrishn48](https://www.linkedin.com/in/ujjwalkrishna48/) - ujjwalkrishna48@gmail.com

Project Link: [https://github.com/ujjwalkrishna/ProductFi.git](https://github.com/ujjwalkrishna/ProductFi.git)

