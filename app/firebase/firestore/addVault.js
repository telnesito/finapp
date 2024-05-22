import { db, auth } from "..";
import { doc, collection, setDoc } from "firebase/firestore";

export const agregarCuenta = async (data) => {
  try {
    const { usuario, email, clave, plataforma } = data;

    // Comprobamos si hay un usuario iniciado
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      // Creamos una referencia al documento del proyecto en la colección "proyectos" del usuario correspondiente

      const profileDoc = doc(db, "users", uid)
      const vaultDoc = doc(
        collection(db,
          "users", uid, "vault"));
      // Establecemos los datos del proyecto en el documento correspondiente
      await setDoc(vaultDoc, {
        usuario,
        email,
        clave,
        plataforma
      });


      return 'Se ha registrado correctamente a la bovedad'
    } else {
      throw new Error("No existe un usuario logueado");
    }
    // Devolvemos un mensaje indicando que el proyecto se ha creado correctamente
  } catch (error) {
    // Si se produce un error, devolvemos el mensaje de error en la respuesta
    return error
  }
};