const models = require('../models/category')
module.exports = {
    postCategory: async (req, res) => {
        const data = {
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        models.postCategory(data).then((result) => {
            res.json({ ...data, idCategory: result.insertId })
        }).catch((error) => {
            console.log(error);
        })
    },
    getAllCategory: (req, res) => {
        models.getAllCategory().then((result) => {
            res.json(result)
        }).catch((error) => {
            console.log(error);
        })
    }
}