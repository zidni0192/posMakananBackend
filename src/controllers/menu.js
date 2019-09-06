const models = require('../models/menu')
const cloudinary = require('cloudinary')

module.exports = {
    postMenu: async(req, res) => {
        let path = req.file.path
        let getUrl = async () => {
            cloudinary.config({
                cloud_name: 'dboxbbxe4',
                api_key: '461246952114187',
                api_secret: '0Ek0wq8tap2RlE2RxzHQB_8UtZU'
            })
            let data
            await cloudinary.uploader.upload(path, (result, error) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result
            })
            return data
        }
        let result
        await getUrl().then((res) => {
            result = res
        }).catch((err) => {
            throw err
        })

        const data = {
            name: req.body.name,
            image: result.url,
            price: req.body.price,
            categoryId: req.body.categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        models.postMenu(data).then((result) => {
            res.json({ ...data, idMenu: result.insertId })
        }).catch((error) => {
            console.log(error);
        })
    },
    patchMenu: (req, res) => {
        const data = {
            title: req.body.title,
            description: req.body.description,
            categoryId: req.body.categoryId,
            updatedAt: new Date()
        }
        const idMenu = req.params.idMenu
        models.patchMenu(data, idMenu).then((result) => {
            res.json({ ...data, idMenu: result.insertId })
        }).catch((error) => {
            console.log(error);
        })
    },
    getAllMenus: (req, res) => {
        const search = req.query.search || ''
        models.getAllMenus(search).then((result) => {
            res.json(result)
        }).catch((error) => {
            console.log(error);
        })
    },
    deleteMenu: (req, res) => {
        const idMenu = req.params.idMenu
        models.deleteMenu(idMenu).then((result) => {
            res.json(result)
        }).catch((error) => {
            console.log(error);
        })
    },
}