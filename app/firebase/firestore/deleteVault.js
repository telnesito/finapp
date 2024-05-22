import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "..";

export const eliminarCuenta = async (idcuenta) => {

  try {

    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      await deleteDoc(doc(db,
        "users", uid,
        "vault", idcuenta));

    }

  } catch (error) {
    return error
  }
}