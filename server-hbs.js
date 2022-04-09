/* Init required variables */
const express = require('express')
const bodyparser = require('body-parser')
const { engine } = require('express-handlebars')
const api = require('./routes/api')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(api)
app.use(express.static('public'))
app.use(bodyparser.json())

// Handlebars
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  })
)
app.set('view engine', 'hbs')
app.set('views', './views')


/* ------------------------------------------------ */
/* Server listener */
const PORT = 8080
const server = app.listen(PORT)
server.on('error', (error) => console.log(`Error en servidor ${error}`))