import { updateProfile } from "firebase/auth";
import { auth } from "..";
export const actualizarPerfil = async (updatedFields) => {

  try {
    const { nombre, apellido } = updatedFields
    console.log(auth.currentUser)
    const res = await updateProfile(auth.currentUser, {
      displayName: nombre + " " + apellido
    })
    return 'Perfil actualizado correctamente'
  } catch (error) {
    return error
  }
}
