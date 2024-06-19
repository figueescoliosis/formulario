import { agregarLibro, obtenerLibros, eliminarLibro, obtenerLibroPorId, actualizarLibro } from "./firebase.js"

let id = 0

document.getElementById('btn-enviar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btn-enviar').value == 'Enviar') {
            const libro = {
                'titulo': document.getElementById('titulo').value.trim(),
                'autor': document.getElementById('autor').value.trim(),
                'fechaPublicacion': document.getElementById('fecha-publicacion').value,
                'imagen': document.getElementById('imagen').value.trim(),
                'genero': document.getElementById('genero').value.trim(),
                'edadLectura': document.getElementById('edad-lectura').value.trim(),
                'precio': document.getElementById('precio').value,
                'cantidad': document.getElementById('cantidad').value
            }
            agregarLibro(libro)
            limpiar()
        } else {
            const libro = {
                'titulo': document.getElementById('titulo').value.trim(),
                'autor': document.getElementById('autor').value.trim(),
                'fechaPublicacion': document.getElementById('fecha-publicacion').value,
                'imagen': document.getElementById('imagen').value.trim(),
                'genero': document.getElementById('genero').value.trim(),
                'edadLectura': document.getElementById('edad-lectura').value.trim(),
                'precio': document.getElementById('precio').value,
                'cantidad': document.getElementById('cantidad').value
            }
            actualizarLibro(id, libro)
            limpiar()
            id = 0
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    obtenerLibros((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
                <td>${item.titulo}</td>
                <td>${item.autor}</td>
                <td>${item.fechaPublicacion}</td>
                <td>${item.imagen}</td>
                <td>${item.genero}</td>
                <td>${item.edadLectura}</td>
                <td>${item.precio}</td>
                <td>${item.cantidad}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarLibro(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async() => {
                const doc = await obtenerLibroPorId(btn.id)
                const d = doc.data()
                console.log(d.edadLectura)
                document.getElementById('titulo').value = d.titulo
                document.getElementById('autor').value = d.autor
                document.getElementById('fecha-publicacion').value = d.fechaPublicacion
                document.getElementById('imagen').value = d.imagen
                document.getElementById('genero').value = d.genero
                document.getElementById('edad-lectura').value = d.edadLectura
                document.getElementById('precio').value = d.precio
                document.getElementById('cantidad').value = d.cantidad
                document.getElementById('btn-enviar').value = 'Modificar'
                id = btn.id
            })
        })
    })
})
