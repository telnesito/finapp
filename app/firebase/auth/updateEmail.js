import { updateEmail } from "firebase/auth";
import { auth } from "..";

export const actualizarEmail = async (newEmail) => {

  try {
    console.log(newEmail)
    await updateEmail(auth.currentUser, newEmail)
    return 'Correo actualizado correctamente'
  } catch (error) {
    return error
  }

}
