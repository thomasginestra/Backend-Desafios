const fs = require("fs");
const productos = require("./products");

class Container {
    constructor(filename) {
        this.filename = filename;
    }

    // WRITE 
    async escribir(dato) {
        try{
            const contenido = await fs.promises.writeFile(this.filename, dato);
            return contenido;
        } catch(error) {
            console.log(error);
        }
    }

    // GET ALL
    async leer(){
        try{
            let contenido = await fs.promises.readFile(this.filename, "utf-8");
            return JSON.parse(contenido);
        } catch (error){
            console.log(error)
        }
    }

    // SAVE
    async guardar(objeto) {
        const contenido = await this.leer();
        const contenidoParseado = JSON.parse(contenido);
    
        const nuevoId = contenidoParseado[contenidoParseado.length - 1].id + 1;
        objeto.id = nuevoId;
    
        const nuevoContenido = contenidoParseado.push(objeto);
    
        await this.escribir(JSON.stringify(contenidoParseado));
        return nuevoId;
      }
    
    // GET BY ID
    async leerPorId(id){
        try{
            const contenido = await this.leer()
            const contenidoParseado = JSON.parse(contenido);
            const elementos = contenidoParseado.filter((e) => e.id === id);
            return elementos;
        } catch (error){
            console.log(error)
        }
    }

    // DELETE ALL
    async borrar(){
        try{
            await fs.promises.writeFile(this.filename, "[]");
        } catch {
            throw new Error(error)
        }
    }

    // DELETE BY ID
    async borrarPorId(id){
        try{
            const contenido = await this.leer();
            const contenidoParseado = JSON.parse(contenido);

            const elementos = contenidoParseado.filter((e) => e.id !== id);
            await this.escribir(JSON.stringify(elementos));
            const nuevoContenido = await this.leer();
            return nuevoContenido;
        } catch (error){
            console.log(error)
        }
    }
}

let contenedor = new Container("./products.txt")
// contenedor.escribir(JSON.stringify(productos)) // AGREGA LOS PRODUCTOS DEL products.js

module.exports = contenedor;