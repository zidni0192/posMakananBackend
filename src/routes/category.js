const controller = require('../controllers/category')
const app = require('express')
const Route = app.Router()

Route
    .post('/', controller.postCategory)
    .get('/', controller.getAllCategory)

module.exports = Route