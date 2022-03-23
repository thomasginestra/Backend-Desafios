const contenedor = require('./controllers/index')

const express = require("express");
const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

app.get("/productos", (req, res) => {
  contenedor.leer().then(resp=>res.send(resp))
});

app.get("/productoRandom", (req, res)=>{
  contenedor.leer().then(resp=>res.send(
    resp[Math.floor(Math.random()*resp.length)]
  ))
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));