const express = require('express')
const Route = express.Router()
const controller = require('../controllers/transaksi')
Route
.post('/',controller.postTransaksi)
.get('/',controller.getTransaksi)

module.exports = Route