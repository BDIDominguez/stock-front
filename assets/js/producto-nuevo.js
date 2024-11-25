import {consultaProductoxPLU} from './api.js'

function consultaProductoxPLU(){
    const vPLU = document.getElementById('plu').value
    if (!vPLU){
        alert("Por favor, Ingrese un PLU")
        return
    }
    try {
        consultaProductoxPLU().then
    } catch (error) {
        
    }
}
