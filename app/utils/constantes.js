import { AiFillHome } from "react-icons/ai";
import { AiOutlineCreditCard } from "react-icons/ai";
import { AiTwotoneCarryOut } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillCreditCard } from "react-icons/ai";
import { AiFillCarryOut } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { TiUser } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";


// Imports de iconos para las categorias

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

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
    icon: AiOutlineHome,
    activeIcon: AiFillHome
  },
  {
    page: 'Deudas',
    icon: AiOutlineCreditCard,
    activeIcon: AiFillCreditCard

  },
  {
    page: 'Objetivos',
    icon: AiTwotoneCarryOut,
    activeIcon: AiFillCarryOut
  },
  {
    page: 'Chatbot',
    icon: AiOutlineMessage,
    activeIcon: AiFillMessage
  },
  {
    page: 'Perfil',
    icon: AiOutlineUser,
    activeIcon: TiUser
  },
]

export const TRANS_OPCIONES = ['Ingresos', 'Pagos', 'Transf']

export const ICONS = [
  {
    categoria: 'Salario',
    icon: AttachMoneyIcon
  },

  {
    categoria: 'Freelance',
    icon: WorkOutlineIcon
  },
  {
    categoria: 'Dinero extra',
    icon: SellOutlinedIcon
  },
  {
    categoria: 'Plus',
    icon: CardGiftcardOutlinedIcon
  },
  {
    categoria: 'Otro',
    icon: CategoryOutlinedIcon
  },
  {
    categoria: 'Comida',
    icon: FastfoodOutlinedIcon
  },
  {
    categoria: 'Entretenimiento',
    icon: SportsEsportsOutlinedIcon
  },
  {
    categoria: 'Transporte',
    icon: DirectionsCarFilledOutlinedIcon
  },
  {
    categoria: 'Educacion',
    icon: SchoolOutlinedIcon
  },
  {
    categoria: 'Regalos',
    icon: CardGiftcardOutlinedIcon
  },
  {
    categoria: 'Ropa',
    icon: CheckroomOutlinedIcon
  },
  {
    categoria: 'Productos de belleza',
    icon: AutoFixHighOutlinedIcon
  },
  {
    categoria: 'Cultura',
    icon: LibraryBooksOutlinedIcon
  },
  {
    categoria: 'Mantenimiento del hogar',
    icon: BlenderOutlinedIcon
  },

]
