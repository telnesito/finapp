import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '..';
export const obtenerBoveda = (uid, callback) => {
  const unsub = onSnapshot(collection(db,
    "users", uid, "vault"),
    (snapshot) => {
      let vaults = []; // Reinicia el array de transacciones en cada snapshot
      snapshot.forEach((doc) => {
        const vault = doc.data();
        vaults.push({ id: doc.id, ...vault }); // Incluye el ID del documento
      });
      console.log(vaults)
      callback(vaults); // Llama al callback con las transacciones
    });

  return unsub; // Devuelve la función de desuscripción por si necesitas cancelarla más tarde
};
