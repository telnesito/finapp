import { signOut } from "firebase/auth";
import { auth } from "..";

export const cerrarSesion = async () => {
  try {
    const res = await signOut(auth)
    return 'Sesion cerrada correctamente'
  } catch (error) {
    return error
  }
}