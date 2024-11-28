//const baseURL = `https://stock-62p7.onrender.com`
const baseURL = `http://localhost:8080`
export async function traerProductos() {
    const url = `${baseURL}/api/producto`
    try {
        const respuesta = await fetch(url)
        if (respuesta.ok){
            const datos = await respuesta.json()
            return datos;
            //console.log("Respuesta ", datos)
        }else{
            console.log("Error al obtener los datos: ", respuesta.status)
            return []
            //console.log("Respuesta", {})
        }    
    } catch (error) {
        console.error("Error al obtener los datos: ", error)
        return []
    }
}

export function muestraTabla(productos, tabla, campos) {
    if (!tabla){
        console.error("No se encontro el element tbody para la tabla")
        return
    }

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    productos.forEach((producto) => {
        const fila = document.createElement('tr')
        fila.innerHTML = campos
            .map((campo) => {
                if (campo == 'precio'){
                    return `<td>${formatter.format(producto[campo])}</td>`
                }
                return `<td>${producto[campo]}</td>` 
            })
            .join('')
        tabla.appendChild(fila)
    });
}

export async function consultaProductoxPLU(plu){
    const url = `${baseURL}/api/producto/${plu}`
    try {
        const respuesta = await fetch(url)
        if (respuesta.ok){
            const datos = respuesta.json()
            return datos
        }else{
            console.log("Error al obtener los Datos ", respuesta.status)
            return []
        }

    } catch (error) {
        console.log("Error al obtener los Datos ", error)
        return []
    }
}

export async function guardarProducto(producto) {
    const urlbase = `${baseURL}/api/producto`
    let url = urlbase
    let method = "POST"
    console.log("Producto recibido  ",producto)
    console.log("Producto.plu   " ,producto.plu)
    console.log("Producto.plu > 0  " ,producto.plu > 0)
    
    if (producto.plu && producto.plu > 0){
        const existe = consultaProductoxPLU(producto.plu)
        if (existe.plu === producto.plu){
            url = `${urlbase}/${producto.plu}`    
            method = "PUT"
        }else{
            url = `${urlbase}`
        }
    }

    console.log("Cadena de conexion al back  ",url)
    console.log("Producto a Guardar  ",producto)
    try {
        const respuesta = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        })
        if (!respuesta.ok){
            throw new Error(`Error al guardar el producto: ${respuesta.statusText}`)
        }
        const datos = await respuesta.json()
        console.log("Producto guardado con exito: ", datos)
        return datos
    } catch (error) {
        console.log("Try Error: ", error)
        throw error
    }
}

export async function eliminarProductoxPLU(plu){
    const url = `${baseURL}/api/producto/${plu}`
    try {
        const respuesta = await fetch(url, {
            method: 'DELETE',
        })
        if (respuesta.ok){
            console.log("Se eliminar el producto correctamente")
            return true
        }else{
            console.log("Error al eliminar el producto ", respuesta.status)
            return false
        }

    } catch (error) {
        console.log("Try Error al intentar elimunar ", error)
        return false
    }
}