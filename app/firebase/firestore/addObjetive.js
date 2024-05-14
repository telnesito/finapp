import { db, auth } from "..";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
import { getUserProfile } from "./getProfileFromDb";

export const agregarObjetivo = async (data) => {
  try {
    const { fecha, meta, titulo, categoria, descripcion, porcentaje, estado, saldoActual } = data;

    // Comprobamos si hay un usuario iniciado
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      // Creamos una referencia al documento del proyecto en la colección "proyectos" del usuario correspondiente

      const profileDoc = doc(db, "users", uid)
      const objetivoDoc = doc(
        collection(db,
          "users", uid, "objetivos"));
      // Establecemos los datos del proyecto en el documento correspondiente
      await setDoc(objetivoDoc, {
        fecha,
        meta,
        saldoActual,
        titulo,
        categoria,
        descripcion,
        porcentaje: Math.floor((saldoActual / meta) * 100),
        estado
      });


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