const connection = require('../configs/db')

module.exports = {
    postUser: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getByEmail: (username) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE username=?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}