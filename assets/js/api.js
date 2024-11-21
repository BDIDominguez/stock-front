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