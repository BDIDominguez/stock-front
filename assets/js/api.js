
export async function traerProductos() {
    const url = `https://stock-62p7.onrender.com/api/producto`
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
    const url = `https://stock-62p7.onrender.com/api/producto/${plu}`
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
    const urlbase = `https://stock-62p7.onrender.com/api/producto`
    let url = urlbase
    let nethod = "POST"

    if (producto.plu && producto.plu > 0){
        url = `${urlbase}/${producto.plu}`
        method = "PUT"
    }
    try {
        const respuesta = await fetch(url, {
            method: method,
            headers: {
                "Contect-Type": "application/json",
            },
            body: JSON.stringify(producto),
        })
        if (!respuesta.ok){
            throw new Error(`Error al guardar el producto: ${respuesta.statusText}`)
        }
        const datos = await respuesta.json()
        console.log("Producto guardado con exito: ", data)
        return datos
    } catch (error) {
        console.log("Error: ", error)
        throw error
    }

    
}