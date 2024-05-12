import { auth } from "..";
import { signInWithEmailAndPassword } from "firebase/auth";


export const iniciarSesion = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user

  } catch (error) {
    return error.code
  }
}
