import {traerProductos, muestraTabla } from './api.js'


document.addEventListener('DOMContentLoaded', async() =>{
    const productos = await traerProductos()
    //console.log("Productos: ", productos)
    
    const tabla = document.querySelector('#productos tbody')
    muestraTabla(productos, tabla, ['plu','nombre','precio'])

})

