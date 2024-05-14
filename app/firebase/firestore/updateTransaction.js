import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "..";
import { getUserProfile } from "./getProfileFromDb";



export const actualizarTransaccion = async (idtrans, updatedFields) => {

  try {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const profileDoc = doc(db, "users", uid);
      const refTrans = doc(db, "users", uid, "transacciones", idtrans);

      const userData = await getUserProfile(uid);
      const docSnap = await getDoc(refTrans);

      if (docSnap.exists()) {
        const oldImporte = parseInt(docSnap.data().importe);
        const newImporte = parseInt(updatedFields.importe);

        if (oldImporte > 0) {
          console.log("Document data:", oldImporte);

          // Restar el importe antiguo del balance general
          const updatedBalance = userData.balance_general - oldImporte;

          // Actualizar el balance general con el importe antiguo restado
          await updateDoc(profileDoc, {
            balance_general: updatedBalance
          });

          // Actualizar el balance general con el nuevo importe sumado
          await updateDoc(profileDoc, {
            balance_general: updatedBalance + newImporte
          });

          // Actualizar la transacción con los nuevos datos
          await updateDoc(refTrans, updatedFields);

          console.log(`Balance actualizado: ${updatedBalance + newImporte}`);
        } else {
          console.log("Document data:", oldImporte);

          // Sumar el importe antiguo al balance general (porque es negativo)
          const updatedBalance = userData.balance_general + Math.abs(oldImporte);

          // Actualizar el balance general con el importe antiguo sumado
          await updateDoc(profileDoc, {
            balance_general: updatedBalance
          });

          // Actualizar el balance general con el nuevo importe restado
          await updateDoc(profileDoc, {
            balance_general: updatedBalance + newImporte
          });

          // Actualizar la transacción con los nuevos datos
          await updateDoc(refTrans, updatedFields);

          console.log(`Balance actualizado: ${updatedBalance + newImporte}`);
        }
      }
    }
  } catch (error) {
    return error;
  }


}