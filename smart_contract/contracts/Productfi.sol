pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Productfi {

    // A struct which helps create a new code
    // code is a combination of - brand name, model no, status, description,
    // manufacturer details, retailer details, owner details

    //Status = (0: product is manufactured, 1: product has been sold, 2: product stolen)
    struct codeObj {
        uint status;
        string brand;
        string model;
        string description;
        string manufactuerName;
        string manufactuerLocation;
        string manufactuerTimestamp;
        string retailer;
        string[] customers;
    }

    // A struct which helps create a new customer
    struct customerObj {
        string name;
        string phone;
        string[] code;
        bool isValue;
    }

    struct retailerObj {
        string name;
        string location;
    }

    mapping (string => codeObj) codeArr;
    mapping (string => customerObj) customerArr;
    mapping (string => retailerObj) retailerArr;

    // Function to create a new code for the product
    function createCode(string memory _code, string memory _brand, string memory _model, uint _status, string memory _description, string memory _manufactuerName, string memory _manufactuerLocation, string memory _manufactuerTimestamp) public payable returns (uint) {
        codeObj memory newCode;
        newCode.brand = _brand;
        newCode.model = _model;
        newCode.status = _status;
        newCode.description = _description;
        newCode.manufactuerName = _manufactuerName;
        newCode.manufactuerLocation = _manufactuerLocation;
        newCode.manufactuerTimestamp = _manufactuerTimestamp;
        codeArr[_code] = newCode;
        return 1;
    }

    // Function for showing product details if the person scanning the product is not the owner
    function getNotOwnedCodeDetails(string memory _code) public view returns (string memory, string memory, uint, string memory, string memory, string memory, string memory) {
        string memory brand = codeArr[_code].brand;
        string memory model = codeArr[_code].model;
        uint status = codeArr[_code].status;
        string memory description = codeArr[_code].description;
        string memory manufactuerName = codeArr[_code].manufactuerName;
        string memory manufactuerLocation = codeArr[_code].manufactuerLocation;
        string memory manufactuerTimestamp = codeArr[_code].manufactuerTimestamp;
        return (brand, model, status, description, manufactuerName, manufactuerLocation, manufactuerTimestamp);
    }

    // Get Current Owner
    function getCurrentOwner(string memory _code) public view returns(string memory) {
        uint status = codeArr[_code].status;
        string memory currentOwner;
        if(status == 0){
            if(bytes(codeArr[_code].retailer).length!=0){
                currentOwner = retailerArr[codeArr[_code].retailer].name;
            }else{
                currentOwner = codeArr[_code].manufactuerName;
            }
        }else{
            currentOwner = customerArr[codeArr[_code].customers[0]].name;
        }
        return currentOwner;
    }

    // Function for showing product details if the person scanning the product is the owner
    function getOwnedCodeDetails(string memory _code) public view returns (string memory, string memory) {
        string memory name = retailerArr[codeArr[_code].retailer].name;
        string memory location = retailerArr[codeArr[_code].retailer].location;
        return (name, location);
    }

    // Adding retailer to code
    function addRetailerToCode(string memory _code, string memory _hashedEmailRetailer) public payable returns (uint) {
        codeArr[_code].retailer = _hashedEmailRetailer;
        return 1;
    }

    // Function for creating a new customer
    function createCustomer(string memory _hashedEmail, string memory _name, string memory _phone) public payable returns (bool) {
        if (customerArr[_hashedEmail].isValue) {
            return false;
        }
        customerObj memory newCustomer;
        newCustomer.name = _name;
        newCustomer.phone = _phone;
        newCustomer.isValue = true;
        customerArr[_hashedEmail] = newCustomer;
        return true;
    }

    function getCustomerDetails(string memory _code) public view returns (string memory, string memory) {
        string memory name = customerArr[_code].name;
        string memory phone = customerArr[_code].phone;
        return (name, phone);
    }

    // Function for creating a new retailer
    function createRetailer(string memory _hashedEmail, string memory _retailerName, string memory _retailerLocation) public payable returns (uint) {
        retailerObj memory newRetailer;
        newRetailer.name = _retailerName;
        newRetailer.location = _retailerLocation;
        retailerArr[_hashedEmail] = newRetailer;
        return 1;
    }

    function getRetailerDetails(string memory _code) public view returns (string memory, string memory) {
        string memory name = retailerArr[_code].name;
        string memory location = retailerArr[_code].location;
        return (name, location);
    }

    event reportStolenResponse(bool response);
    
    // Function to report stolen
    function reportStolen(string memory _code, string memory _customer) public payable returns (bool) {
        uint i;
        // Checking if the customer exists
        if (customerArr[_customer].isValue) {
            // Checking if the customer owns the product
            for (i = 0; i < customerArr[_customer].code.length; i++) {
                if (compareStrings(customerArr[_customer].code[i], _code)) {
                    codeArr[_code].status = 2;        // Changing the status to stolen
                    emit reportStolenResponse(true);
                    return true;
                }
            }
        }
        emit reportStolenResponse(false);
        return false;
    }

    event reportFoundResponse(bool response);
    
    // Function to report found
    function reportFound(string memory _code, string memory _customer) public payable returns (bool) {
        uint i;
        // Checking if the customer exists
        if (customerArr[_customer].isValue) {
            // Checking if the customer owns the product
            for (i = 0; i < customerArr[_customer].code.length; i++) {
                if (compareStrings(customerArr[_customer].code[i], _code)) {
                    codeArr[_code].status = 1;        // Changing the status to found or owned
                    emit reportFoundResponse(true);
                    return true;
                }
            }
        }
        emit reportFoundResponse(false);
        return false;
    }

    event changeOwnerResponse(bool response);

    function changeOwner(string memory _code, string memory _oldCustomer, string memory _newCustomer) public payable returns (bool) {
        uint i;
        bool flag = false;
        //Creating objects for code,oldCustomer,newCustomer
        codeObj memory product = codeArr[_code];
        uint len_product_customer = product.customers.length;
        customerObj memory oldCustomer = customerArr[_oldCustomer];
        uint len_oldCustomer_code = customerArr[_oldCustomer].code.length;
        customerObj memory newCustomer = customerArr[_newCustomer];

        //Check if oldCustomer and newCustomer have an account
        if (oldCustomer.isValue && newCustomer.isValue) {
            //Check if oldCustomer is owner
            for (i = 0; i < len_oldCustomer_code; i++) {
                if (compareStrings(oldCustomer.code[i], _code)) {
                    flag = true;
                    break;
                }
            }

            if (flag == true) {
                //Swaping oldCustomer with newCustomer in product
                for (i = 0; i < len_product_customer; i++) {
                    if (compareStrings(product.customers[i], _oldCustomer)) {
                        codeArr[_code].customers[i] = _newCustomer;
                        break;
                    }
                }

                // Removing product from oldCustomer
                for (i = 0; i < len_oldCustomer_code; i++) {
                    if (compareStrings(customerArr[_oldCustomer].code[i], _code)) {
                        remove(i, customerArr[_oldCustomer].code);
                        // Adding product to newCustomer
                        uint len = customerArr[_newCustomer].code.length;
                        if(len == 0){
                            customerArr[_newCustomer].code.push(_code);
                            customerArr[_newCustomer].code.push("hack");
                        } else {
                            customerArr[_newCustomer].code[len-1] = _code;
                            customerArr[_newCustomer].code.push("hack");
                        }
                        emit changeOwnerResponse(true);
                        return true;
                    }
                }
            }
        }
        emit changeOwnerResponse(false);
        return false;
    }

    event initialOwnerResponse(bool response);

    function initialOwner(string memory _code, string memory _retailer, string memory _customer) public payable returns(bool) {
            // uint i;
            if (compareStrings(codeArr[_code].retailer, _retailer)) {       // Check if retailer owns the product
                if (customerArr[_customer].isValue) {                       // Check if Customer has an account
                    codeArr[_code].customers.push(_customer);               // Adding customer in code
                    codeArr[_code].status = 1;
                    uint len = customerArr[_customer].code.length;
                    if(len == 0) {
                        customerArr[_customer].code.push(_code);
                        customerArr[_customer].code.push("hack");
                    } else {
                        customerArr[_customer].code[len-1] = _code;
                        customerArr[_customer].code.push("hack");
                    }
                    emit initialOwnerResponse(true);
                    return true;
                }
            }
            emit initialOwnerResponse(false);
            return false;
        }

    // Given a customer returns all the product codes he owwns
    function getCodes(string memory _customer) public view returns(string[] memory) {
        string[] memory codes = customerArr[_customer].code;
        return codes;
    }

    // Cannot directly compare strings in Solidity
    // This function hashes the 2 strings and then compares the 2 hashes
    function compareStrings(string memory a, string memory b) internal returns (bool) {
    	return keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b)));
    }

    // Function to delete an element from an array
    function remove(uint index, string[] storage array) internal returns(bool) {
        if (index >= array.length)
            return false;

        for (uint i = index; i < array.length-1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
        return true;
    }

    // Function to convert string to bytes32
    function stringToBytes32(string memory source) internal returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}


// Data for testing the functions
// createCode:           
//                      "11", "Nike", "Jordan", 0, "It's costly", "Amazon", "Mumbai", "11:00"
//                      "22", "Adidas", "Air", 0, "It's limited", "Prabhat Co.", "GUjarat", "12:00"
//                      "33", "Reebok", "Ball", 0, "It's limited", "Prabhat Co.", "GUjarat", "12:00"
// createCustomer:      "81bd53649936d1e82c64ed216d9d7490", "Kyle", "9869245690"
//                      "1c29fb983dbe92474a199631dca38fc6", "Calden", "9123456789"
// createRetailer:      "1111", "Lifestyle", "Andheri"
// addRetailerToCode:   "11", "67xasdbsdfshjd89724hjdsf"
// initialOwner:        "11", "Lifestyle", "Kyle"
//                      "22", "ShopersStop", "Calden"
// changeOwner          "11", "Calden", "Kyle"