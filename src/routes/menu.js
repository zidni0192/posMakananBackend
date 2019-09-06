const controller = require('../controllers/menu')
const app = require('express')
const Route = app.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

Route
    .post('/', upload.single('image'), controller.postMenu)
    .patch('/:idMenu', controller.patchMenu)
    .get('/', controller.getAllMenus)
    .delete('/:idMenu', controller.deleteMenu)

module.exports = Route