'use client'

import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import useModal from '../customHooks/useModa';
import Modal from '../components/Modal';
import TextField from '../components/TextField';
import Button from '../components/Button';
import BackPage from '../components/BackPage';
import { agregarCuenta } from '../firebase/firestore/addVault';
import { obtenerUsuario } from '../firebase/auth/currentSesion';
import { obtenerBoveda } from '../firebase/firestore/getVault';
import { eliminarCuenta } from '../firebase/firestore/deleteVault';

const Page = () => {
  const { isOpen, openModal, isClosing, closeModal } = useModal();
  //router que creo que no se usa pero ahí estaba
  const router = useRouter();
  const [accToDelete, setAccToDelete] = useState("")
  const [userData, setUserData] = useState(obtenerUsuario())
  const [cuentas, setCuentas] = useState({})
  // Estados para los valores del formulario

  const [vault, setVault] = useState({
    usuario: '',
    email: '',
    clave: '',
    plataforma: ''
  })
  // UseModal para los estados de los modales
  const openDetalles = useModal();
  const openEdicion = useModal();
  const openEliminar = useModal();

  const handleGetText = (name, value) => {
    setVault({ ...vault, [name]: value });
  };


  console.log(cuentas)
  // Función para eliminar usuario
  const eliminarFila = async (id) => {

    try {
      const res = await eliminarCuenta(id)
      openEliminar.closeModal();

    } catch (error) {
      console.log(error)
    }
  };

  // Almacenar informacion de los usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Guardar la información de los usuarios
  const handleGuardar = async (event) => {
    event.preventDefault();

    try {
      const response = await agregarCuenta(vault)
      console.log(response)
      closeModal();

    } catch (error) {
      console.log(error)
    }

  };

  // Estado para almacenar información en el modal de detalles
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Mostrar la información del usuario en el modal de detalles
  const abrirDetalles = (user) => {
    setUsuarioSeleccionado(user);
    openDetalles.openModal();

  };




  // Guardar la información editada del usuario seleccionado no funciona no se por que
  const handleGuardarEdicion = (event) => {
    event.preventDefault();
    const usuarioEditado = {
      usuario,
      correo,
      contrasena
    };

    // Buscar el usuario seleccionado en la lista de usuario
    const usuariosActualizados = usuarios.map(user =>
      user === usuarioSeleccionado ? usuarioEditado : user
    );

    setUsuarios(usuariosActualizados);
    openEdicion.closeModal();
  };


  useEffect(() => {
    if (!userData) {
      router.push('/login');
    } else {
      const unsub = obtenerBoveda(userData.uid, (cuentas) => {
        setCuentas(cuentas);
      });
    }


  }, [userData])

  return (
    <Box p={'20px 20px'}>
      <BackPage destino={'perfil'} paginaActual={'Gestion cuentas'} />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Usuario</TableCell>
              <TableCell align="left">Plataforma</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {cuentas.length > 0 && cuentas.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="left">{user.usuario}</TableCell>
                <TableCell align="left">{user.plataforma}</TableCell>
                <TableCell align="center">
                  <RemoveRedEyeIcon onClick={() => abrirDetalles(user)} />
                  <DeleteIcon onClick={() => {
                    setAccToDelete(user.id)
                    openEliminar.openModal()
                  }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        padding={'15px 15px'}
        onClick={openModal}
        component={'button'}
        position={'fixed'}
        bottom={'20px'}
        right={'20px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'60px'}
        height={'60px'}
        borderRadius={'100%'}
        bgcolor={'#100D40'}
      >
        <AddIcon
          sx={{
            color: 'white',
            fontSize: '30px',
          }}
        />
      </Box>

      {/* Modal Agregar */}
      <Modal isOpen={isOpen} isClosing={isClosing} closeModal={closeModal}>
        <form onSubmit={handleGuardar} className='flex flex-col gap-3 '>
          <Box
            display={'flex'}
            component={'button'}
            onClick={() => closeModal()}
            flexDirection={'row'}
            marginBottom={'20px'}
            alignItems={'center'}
            gap={'10px'}
          >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Agregar cuenta</p>
          </Box>
          <TextField type='text' label={'Nombre de usuario'} defaultValue={vault.usuario} onChange={(value) => handleGetText('usuario', value)} />
          <TextField type='text' label={'Plataforma'} defaultValue={vault.plataforma} onChange={(value) => handleGetText('plataforma', value)} />
          <TextField type='email' label={'Correo electronico'} defaultValue={vault.email} onChange={(value) => handleGetText('email', value)} />
          <TextField type='password' label={'Contraseña'} defaultValue={vault.clave} onChange={(value) => handleGetText('clave', value)} />


          <div className='flex items-center justify-center mt-6'>
            <Button value={'Guardar'} type='contained' />
          </div>
        </form>
      </Modal>

      {/* Modal Detalles */}
      <Modal isOpen={openDetalles.isOpen} isClosing={openDetalles.isClosing} closeModal={openDetalles.closeModal}>
        <form onSubmit={() => console.log('Submiteado')} className='flex flex-col gap-3 '>
          <Box
            display={'flex'}
            component={'button'}
            onClick={() => openDetalles.closeModal()}
            flexDirection={'row'}
            marginBottom={'20px'}
            alignItems={'center'}
            gap={'10px'}
          >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Detalles de la cuenta</p>
          </Box>
          <TextField
            type='text'
            label={'Nombre de usuario'}
            defaultValue={usuarioSeleccionado ? usuarioSeleccionado.usuario : ''}
            readOnly
          />
          <TextField
            type='email'
            label={'Correo electronico'}
            defaultValue={usuarioSeleccionado ? usuarioSeleccionado.email : ''}
            readOnly
          />

          <TextField type='text'
            label={'Contraseña'}
            defaultValue={usuarioSeleccionado ? usuarioSeleccionado.clave : ''}
            readOnly />

          <TextField type='text'
            label={'Plataforma'}
            defaultValue={usuarioSeleccionado ? usuarioSeleccionado.plataforma : ''}
            readOnly />

        </form>
        <div className='flex items-center justify-center mt-6'>
          <Button onClick={(e) => {
            openDetalles.closeModal();
          }} value={'Cerrar'} type='contained' />
        </div>
      </Modal>


      {/* Modal Eliminar */}
      <Modal isOpen={openEliminar.isOpen} isClosing={openEliminar.isClosing} closeModal={openEliminar.closeModal}>
        <Box
          display={'flex'}
          component={'button'}
          onClick={() => openEliminar.closeModal()}
          flexDirection={'row'}
          marginBottom={'20px'}
          alignItems={'center'}
          gap={'10px'}
        >
          <KeyboardArrowLeftIcon />
          <p className='text-azulMarino text-[18px] font-medium '>Eliminar información</p>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} className='text-azulMarino'>
          <p className='text-azulMarino text-[18px] font-medium'>¿Seguro que deseas eliminar la información?</p>
        </Box>
        <div className='flex items-center justify-center mt-6'>
          <Button onClick={() => eliminarFila(accToDelete)} value={'Eliminar'} type='contained' />
        </div>
      </Modal>
    </Box>
  );
};

export default Page; 