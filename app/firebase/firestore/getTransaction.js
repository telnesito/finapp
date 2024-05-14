import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '..';
export const obtenerTransacciones = (uid, callback) => {
  const unsub = onSnapshot(collection(db, "users", uid, "transacciones"), (snapshot) => {
    let transacciones = []; // Reinicia el array de transacciones en cada snapshot
    snapshot.forEach((doc) => {
      const transaccion = doc.data();
      transacciones.push({ id: doc.id, ...transaccion }); // Incluye el ID del documento
    });
    callback(transacciones); // Llama al callback con las transacciones
  });

  return unsub; // Devuelve la función de desuscripción por si necesitas cancelarla más tarde
};
