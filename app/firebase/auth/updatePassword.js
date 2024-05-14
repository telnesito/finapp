import { getAuth, updatePassword } from "firebase/auth";
import { auth } from "..";


const user = auth.currentUser;


export const actualizarContra = async ({ newPassword }) => {
  try {
    await updatePassword(user, newPassword)
    return 'Actualizacion realizada correctamente'
  } catch (error) {
    return error
  }
}