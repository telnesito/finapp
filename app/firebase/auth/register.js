
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "..";
import { addToFireStore } from "../firestore/documents";

export const registrarUsuario = async (email, password, username) => {

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, username)

    const profileUpdated = await updateProfile(auth.currentUser, {
      displayName: username
    })

    addToFireStore(userCredential.user)

    return userCredential.user
  } catch (error) {
    return error
  }
}


