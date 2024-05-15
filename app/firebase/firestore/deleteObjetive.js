import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "..";

export const eliminarObjetivo = async (idtrans) => {

  try {

    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      await deleteDoc(doc(db,
        "users", uid,
        "objetivos", idtrans));

      return 'Objetivo eliminado correctamente'
    }

  } catch (error) {
    return error
  }
}