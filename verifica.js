function verificar(id) {
    let element = document.getElementById(id)
    if (!element.value) {
        element.classList.add('is-invalid')
    } else {
        element.classList.remove('is-invalid')
    }
}
function limpiar() {
    document.getElementById('titulo').value = ''
    document.getElementById('autor').value = ''
    document.getElementById('fecha-publicacion').value = ''
    document.getElementById('imagen').value = ''
    document.getElementById('genero').value = ''
    document.getElementById('edad-lectura').value = '0'
    document.getElementById('edad-lectura-label').innerText = '0'
    document.getElementById('precio').value = ''
    document.getElementById('cantidad').value = ''
}

function actualizarEdad() {
    document.getElementById('edad-lectura-label').innerText = document.getElementById('edad-lectura').value
}