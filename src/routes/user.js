const express = require('express')
const Route = express.Router()
const controller = require('../controllers/user')
Route
.post('/register',controller.postUser)
.post('/login',controller.getByEmail)

module.exports = Route