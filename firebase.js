import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyAZVPNgLO8nCiMLrDip4CF5BnV_cV6LcDs",
    authDomain: "evaluacion3-87053.firebaseapp.com",
    projectId: "evaluacion3-87053",
    storageBucket: "evaluacion3-87053.appspot.com",
    messagingSenderId: "130747639268",
    appId: "1:130747639268:web:8f8508c219ebc6064a93f1"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const agregarLibro = async (libro) => {
    await addDoc(collection(db, 'libros'), libro)
    return true
}

export const obtenerLibros = async (libro) => {
    onSnapshot(collection(db, 'libros'), libro)
}

export const eliminarLibro = async (id) => {
    await deleteDoc(doc(db, 'libros', id))
    return true
}

export const obtenerLibroPorId = async (id) => {
    return getDoc(doc(db, 'libros', id))
}


export const actualizarLibro = async (id, libro) => {
    await updateDoc(doc(db, 'libros', id), libro)
    return true
}
