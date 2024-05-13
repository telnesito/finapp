import { doc, onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "..";



export const sub = (uid) => {
  let transacciones = []

  const unsub = onSnapshot(collection(db,
    "users", uid, "ingresos"),
    (snapshot) => {
      snapshot.forEach((doc) => {
        const transaccion = doc.data()
        console.log(transaccion)
      });

    });
}
