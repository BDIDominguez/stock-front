import {consultaProductoxPLU, guardarProducto,eliminarProductoxPLU} from './api.js'

async function buscarProducto(){
    const vPLU = document.getElementById('plu').value
    if (!vPLU){
        alert("Por favor, Ingrese un PLU")
        return
    }
    try {
       const producto = await consultaProductoxPLU(vPLU)
       if (producto && Object.keys(producto).length > 0){
            mostrarDatosProductos(producto)
       }

    } catch (error) {
        console.error("Error al buscar el producto: ", error)
        alert("Hubo un problema al buscar el producto. Intentelo mas Tarde.")
    }
}



function mostrarDatosProductos(producto){
    document.getElementById('nombre').value = producto.nombre || ""
    document.getElementById('costo').value = producto.costo || ""
    document.getElementById('precio').value = producto.precio || ""
    document.getElementById('stock').value = producto.stock || ""
    
}
window.buscarProducto = buscarProducto;

function limpiarFormulario(){
    document.getElementById('plu').value = ""
    document.getElementById('nombre').value = ""
    document.getElementById('costo').value = ""
    document.getElementById('precio').value = ""
    document.getElementById('stock').value = ""
}
window.limpiarFormulario = limpiarFormulario

async function guardarProd(){
    const producto = creaCadena()
    console.log("Cadena: ", producto)
    try {
        console.log("Guardando!! ")
        const resultado = await guardarProducto(producto)
        if (resultado.plu !== producto.plu){
            document.getElementById('plu').value = resultado.plu
        }
        
    } catch (error) {
        
    }
}
window.guardarProd = guardarProd

function creaCadena(){
    const producto = {
        plu : parseInt(document.getElementById('plu').value,10),
        nombre : document.getElementById('nombre').value,
        costo : parseFloat(document.getElementById('costo').value),
        precio : parseFloat(document.getElementById('precio').value),
        stock : parseFloat(document.getElementById('stock').value)
    }
    return producto 
}

function eliminar(){
    const vPLU = document.getElementById('plu').value
    const confirmacion = confirm(`Seguro de Eliminar el PLU ${vPLU}`)
    if (confirmacion){
        eliminarProductoxPLU(vPLU).then(()=> limpiarFormulario())
        .catch((error) => alert(`No se puede eliminar el PLU: ${vPLU} mensage de error: ${error.message}`))
    }else{
        console.log("Se Cancelo la Eliminacion")
    }
}
window.eliminar = eliminar