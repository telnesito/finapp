import { db, auth } from "..";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
import { getUserProfile } from "./getProfileFromDb";

export const agregarIngreso = async (data) => {
  try {
    const { fecha, importe, titulo, categoria, cuenta, descripcion } = data;

    // Comprobamos si hay un usuario iniciado
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      // Creamos una referencia al documento del proyecto en la colección "proyectos" del usuario correspondiente

      const profileDoc = doc(db, "users", uid)
      const ingresoDoc = doc(collection(db, "users", uid, "ingresos"));
      // Establecemos los datos del proyecto en el documento correspondiente
      await setDoc(ingresoDoc, {
        fecha,
        importe,
        titulo,
        categoria,
        cuenta,
        descripcion
      });
      const userData = await getUserProfile(uid)
      // console.log(userData)
      await updateDoc(profileDoc, {
        balance_general: userData.balance_general + parseInt(importe)
      })


      return 'Se ha registrado correctamente el ingreso'
    } else {
      throw new Error("No existe un usuario logueado");
    }
    // Devolvemos un mensaje indicando que el proyecto se ha creado correctamente
  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    return error
  }
};