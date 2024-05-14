import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "..";

export const eliminarTransaccion = async (idtrans) => {

  try {

    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      await deleteDoc(doc(db,
        "users", uid,
        "transacciones", idtrans));

      return 'Transaccion eliminada correctamente'
    }

  } catch (error) {
    return error
  }
}