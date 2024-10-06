const bcrypt = require("bcrypt")

// for hashing the Password
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash);
            })
        })
    })
}

// compare or decrypt the Password
exports.comparePassword=(password,hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                reject(err)
            }
            resolve(isMatch);
        })
    })
}