/* Init required variables */
const express = require('express')
const bodyparser = require('body-parser')

/* Controllers */
const Container = require('../controllers/products.js')
const path = './controllers/products.txt'
const productos = new Container(path)

/* API Route */
const api = express.Router()
api.use(bodyparser.json())
module.exports = api

api.use((req, res, next) => {
  if (req.originalUrl === '/api/productos/:id') {
    if (req.method === 'POST') {
      req.method = 'PUT'
    }
  }
  next()
})

api.get('/api/productos', (req, res) => {
  productos.getAll().then((result) => {
    res.send(result)
  })
})

api.get('/api/productos/:id', (req, res) => {
  const id = req.params.id
  productos.getById(Number(id)).then((result) => {
    res.send(result || { error: 'Producto no encontrado' })
  })
})

api.post('/api/productos', (req, res) => {
  const newObj = req.body
  const newId = productos.save(newObj)
  res.json(newId)
})

api.put('/api/productos/:id', (req, res) => {
  const newValues = req.body
  let id;
  if(req.params.id==":id"){
    id=req.body.id
  }else{
      id=req.params.id
  }
  productos.modifyById(newValues, id)
  res.send({ obj: 'Producto modificado!' })
})

api.delete('/api/productos/:id', (req,res)=>{
    const id = req.params.id
    productos.deleteById(id).then((result)=>{
        res.send(result || "Hubo un problema al intentar borrar el producto")
    })
})