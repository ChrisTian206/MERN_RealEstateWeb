const bcrypt = require('bcrypt')


/*This function takes a plain-text password as input, and it returns a Promise that 
resolves to the hashed password. It uses bcrypt.genSalt to generate a salt with a 
cost factor of 12 (which determines the computational cost of hashing, higher 
values are more secure but slower), and then it uses bcrypt.hash to hash the 
password with the generated salt. If any errors occur during the salt generation 
or hashing process, the Promise is rejected with the error. */
module.exports.hashPassword = (password) => {
    /*
    Using a Promise in the hashedPassword function is a good practice because 
    the bcrypt functions, genSalt and hash, are asynchronous and callback-based. 
    Promises provide a more convenient and modern way to work with asynchronous 
    operations in JavaScript.
    */
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

module.exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}