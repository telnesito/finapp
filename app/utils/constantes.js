import { AiFillHome } from "react-icons/ai";
import { AiOutlineCreditCard } from "react-icons/ai";
import { AiTwotoneCarryOut } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

export const onBoarding =
  [
    {
      title: 'Gestiona tu balance',
      descripcion: 'Registra fácilmente tu entrada y salida de dinero  junto con su descripción, cantidad y fecha',
      image: 'onboard1.svg',
      primaryText: 'Siguiente',
      secondaryText: 'Saltar todo'
    },

    {
      title: 'Establece objetivos',
      descripcion: 'Puedes establecer objetos de cosas que quieres comprar en un futuro como por ejemplo: casa, carro, juegos, etc..',
      image: 'onboard2.svg',
      primaryText: 'Siguiente',
      secondaryText: 'Saltar todo'
    },

    {
      title: 'Inteligencia artificial',
      descripcion: 'Conversa con nuestro chatbot asistente financiero entrenado con tu información financiera',
      image: 'onboard3.svg',
      primaryText: 'Crear cuenta',
      secondaryText: 'Ya tengo cuenta'
    },

  ]

export const NAVBAR = [
  {
    page: 'Home',
    icon: AiFillHome
  },
  {
    page: 'Deudas',
    icon: AiOutlineCreditCard
  },
  {
    page: 'Objetivos',
    icon: AiTwotoneCarryOut
  },
  {
    page: 'Perfil',
    icon: AiOutlineUser
  },

]
