import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "..";



export const actualizarDeudas = async (idtrans, updatedFields) => {

  try {
    if (auth.currentUser) {
      const { uid } = auth.currentUser
      const { fecha, monto, titulo, categoria, descripcion, completada } = updatedFields;


      const refTrans = doc(
        db, "users",
        uid, "deudas", idtrans);
      // Actualizar la deuda con los nuevos datos
      const res = await updateDoc(refTrans, {
        categoria: categoria,
        completada: completada,
        descripcion: descripcion,
        fecha: fecha,
        monto: monto,
        titulo: titulo
      });

      return 'Campos actualizados'

    }

  } catch (error) {
    return error;
  }


}