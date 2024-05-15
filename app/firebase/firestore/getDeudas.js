import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '..';
export const obtenerDeudas = (uid, callback) => {
  const unsub = onSnapshot(collection(db,
    "users", uid, "deudas"),
    (snapshot) => {
      let deudas = []; // Reinicia el array de transacciones en cada snapshot
      snapshot.forEach((doc) => {
        const deuda = doc.data();
        deudas.push({ id: doc.id, ...deuda }); // Incluye el ID del documento
      });
      console.log(deudas)
      callback(deudas); // Llama al callback con las transacciones
    });

  return unsub; // Devuelve la función de desuscripción por si necesitas cancelarla más tarde
};
