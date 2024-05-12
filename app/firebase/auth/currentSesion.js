import { onAuthStateChanged } from "firebase/auth";
import { auth } from "..";

export const obtenerSesionActiva = () => {
  try {
    onAuthStateChanged(auth, (user) => {

      return user
    })
  } catch (error) {
    return error
  }

}

export const obtenerUsuario = () => {
  return auth.currentUser

}