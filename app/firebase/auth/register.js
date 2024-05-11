
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "..";

export const registrarUsuario = async (email, password, username) => {

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, username)

    const profileUpdated = await updateProfile(auth.currentUser, {
      displayName: username
    })

    return userCredential.user
  } catch (error) {
    return error
  }
}



// import { getAuth, updateProfile } from "firebase/auth";
// const auth = getAuth();
// updateProfile(auth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });


