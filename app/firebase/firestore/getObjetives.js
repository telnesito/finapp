import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '..';
export const obtenerObjetivos = (uid, callback) => {
  const unsub = onSnapshot(collection(db,
    "users", uid, "objetivos"),
    (snapshot) => {
      let objetivos = []; // Reinicia el array de transacciones en cada snapshot
      snapshot.forEach((doc) => {
        const objetivo = doc.data();
        objetivos.push({ id: doc.id, ...objetivo }); // Incluye el ID del documento
      });
      console.log(objetivos)
      callback(objetivos); // Llama al callback con las transacciones
    });

  return unsub; // Devuelve la función de desuscripción por si necesitas cancelarla más tarde
};
