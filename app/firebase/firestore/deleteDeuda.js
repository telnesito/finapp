import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "..";

export const eliminarDeuda = async (idtrans) => {

  try {

    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      await deleteDoc(doc(db,
        "users", uid,
        "deudas", idtrans));

    }

  } catch (error) {
    return error
  }
}