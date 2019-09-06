require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const xss = require('x-xss-protection')
const menuRoutes = require('./src/routes/menu')
const categoryRoutes = require('./src/routes/category')
const transaksiRoutes = require('./src/routes/transaksi')
const userRoutes = require('./src/routes/user')
const mailRoutes = require('./src/routes/sendMail')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(xss())
app.listen(port, () => {
  console.log(`We are running on port ${port}`)
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next();
});
app.use('/menu',menuRoutes)
app.use('/category',categoryRoutes)
app.use('/transaksi',transaksiRoutes)
app.use('/user',userRoutes)
app.use('/mail',mailRoutes)