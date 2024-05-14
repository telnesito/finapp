import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "..";
import { getUserProfile } from "./getProfileFromDb";

export const eliminarTransaccion = async (idtrans) => {

  try {

    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      const profileDoc = doc(db,
        "users", uid);
      const refTrans = doc(db,
        "users", uid,
        "transacciones", idtrans);

      const userData = await getUserProfile(uid);
      const docSnap = await getDoc(refTrans);

      if (docSnap.exists()) {
        const oldImporte = parseInt(docSnap.data().importe);
        console.log(oldImporte)

        if (oldImporte > 0) {
          console.log('aqui')
          console.log("Document data:", oldImporte);

          // Restar el importe antiguo del balance general
          const updatedBalance = userData.balance_general - oldImporte;
          console.log(updatedBalance)
          // Actualizar el balance general con el importe antiguo restado
          await updateDoc(profileDoc, {
            balance_general: updatedBalance
          });
        } else {
          // Sumar el importe antiguo al balance general (porque es negativo)
          const updatedBalance = userData.balance_general + Math.abs(oldImporte);

          // Actualizar el balance general con el importe antiguo sumado
          await updateDoc(profileDoc, {
            balance_general: updatedBalance
          });
        }
      }

      await deleteDoc(doc(db,
        "users", uid,
        "transacciones", idtrans));

      return 'Transaccion eliminada correctamente'
    }

  } catch (error) {
    return error
  }
}