const express = require('express')
const Route = express.Router()
const controller = require('../controllers/sendMail')
Route
.post('/',controller)

module.exports = Route