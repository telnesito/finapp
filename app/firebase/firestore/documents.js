import { doc, setDoc } from "firebase/firestore";
import { db } from "..";
// Add a new document in collection "cities"

export const addToFireStore = async (user) => {

  const res = await
    setDoc(doc
      (db, "users", user.uid), {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      balance_general: 0,
      cedula: 0,
      edad: 0,
    });
  return res
}
