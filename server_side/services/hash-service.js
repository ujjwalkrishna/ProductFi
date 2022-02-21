const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Salt for hashing
const saltRounds = 10;

class HashService {
    // Hash password using bcrypt
    hashBcrypt(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    hashMD5(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}

module.exports = new HashService();
