import { db, auth } from "..";
import { doc, collection, setDoc } from "firebase/firestore";

export const agregarDeuda = async (data) => {
  try {
    // Comprobamos si hay un usuario iniciado
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      // Creamos una referencia al documento del proyecto en la colección "proyectos" del usuario correspondiente

      const objetivoDoc = doc(
        collection(db,
          "users", uid, "deudas"));
      // Establecemos los datos del proyecto en el documento correspondiente
      await setDoc(objetivoDoc, data);


      return 'Se ha registrado correctamente el objetivo'
    } else {
      throw new Error("No existe un usuario logueado");
    }
    // Devolvemos un mensaje indicando que el proyecto se ha creado correctamente
  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    return error
  }
};