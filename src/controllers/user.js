const models = require('../models/user')
const helper = require('../helpers/password')
module.exports = {
    postUser: (req, res) => {
        const salt = helper.generateSalt()
        const passwordHash = helper.setPassword(req.body.password, salt)
        const data = {
            username: req.body.username,
            fullname: req.body.fullname,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(data);
        
        models.postUser(data)
            .then((result) => {
                login(data.username,req.body.password,res)
            })
            .catch((error) => {
                console.log(error)
                res.json(error)
            })
    },
    getByEmail: (req, res) => {
        const username = req.body.username || req.query.username || ""
        const password = req.body.password || req.query.password || ""
        login(username,password,res)
    }
}
function login(username,password,res){
    models.getByEmail(username)
    .then((result) => {
        if (result.length >0) {
            const dataUser = result[0]
            const userPassword = helper.setPassword(password, dataUser.salt).passwordHash
            if (userPassword === dataUser.password) {
                delete dataUser.salt
                delete dataUser.password
                return res.json(dataUser)
            } else {
                res.json('Password Salah')
            }
        }else{
            res.json("Email Tidak Terdaftar")
        }
    })
    .catch((error) => {
        console.log(error)
    })
}