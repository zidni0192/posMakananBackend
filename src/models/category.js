const connection = require('../configs/db')
module.exports = {
    postCategory:(data)=>{
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO category SET ?',data,(err,res)=>{
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })
        })
    },
    getAllCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category', (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    }
}