import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "..";
import { getUserProfile } from "./getProfileFromDb";



export const actualizarObjetive = async (idtrans, updatedFields) => {

  try {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const { fecha, meta, titulo, categoria, descripcion, porcentaje, estado, saldoActual } = updatedFields;

      const refTrans = doc(
        db, "users",
        uid, "objetivos", idtrans);

      // Actualizar la transacción con los nuevos datos
      await updateDoc(refTrans, {
        ...updatedFields,
        porcentaje: Math.floor((saldoActual / meta) * 100),

      });

      return 'Campos actualizados'

    }

  } catch (error) {
    return error;
  }


}