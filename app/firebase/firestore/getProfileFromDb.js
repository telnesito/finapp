import { doc, getDoc } from "firebase/firestore";
import { db } from "..";


export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      throw new Error('No hay ningun documento con el usuario seleccionado')
    }

  } catch (error) {
    return error
  }

}

