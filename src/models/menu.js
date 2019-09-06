const connection = require('../configs/db')
module.exports = {
    postMenu: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO menu SET ?', data, (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    },
    getAllMenus: (search) => {
        const data = `%${search}%`
        return new Promise((resolve, reject) => {
            connection.query('SELECT menu.*,category.idCategory,category.name as categoryName FROM menu INNER JOIN category ON menu.categoryId = category.idCategory WHERE menu.name LIKE ?',data,(err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    },
}