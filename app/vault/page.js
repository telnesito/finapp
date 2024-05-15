'use client'
import React, { useState } from 'react';
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

const Page = () => {
  const { isOpen, openModal, isClosing, closeModal } = useModal();
  const router = useRouter();
  
  // Estados para los valores del formulario
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');

  // UseModal para los estados de los modales
  const openDetalles = useModal();
  const openEdicion = useModal();
  const openEliminar = useModal();

  // Funciones para actualizar los estados 
  const handleUsuario = (value) => {
    setUsuario(value);
  };

  const handleCorreo = (value) => {
    setCorreo(value);
  };

  const handleContrasena = (value) => {
    setContrasena(value);
  };

  const handleConfirmar = (value) => {
    setConfirmar(value);
  };

  // Función para eliminar la última fila de datos
  const eliminarFila = () => {
    const tableRows = document.querySelectorAll('tr');
    const lastDataRow = tableRows[tableRows.length - 1];
    if (lastDataRow) {
      lastDataRow.remove();
    }
    openEliminar.closeModal();
  };

  return (
    <Box p={'20px 20px'}>
      <BackPage destino={'perfil'} paginaActual={'Gestion cuentas'} />

      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Usuario</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{'telnesito'}</TableCell>
              <TableCell align="left">{'carlosternera46@gmail.com'}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <RemoveRedEyeIcon onClick={openDetalles.openModal} />
                <EditIcon onClick={openEdicion.openModal} />
                <DeleteIcon onClick={openEliminar.openModal} />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{'freedito'}</TableCell>
              <TableCell align="left">{'carlosternera46@gmail.com'}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <RemoveRedEyeIcon onClick={openDetalles.openModal} />
                <EditIcon onClick={openEdicion.openModal} />
                <DeleteIcon onClick={openEliminar.openModal} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        padding={'15px 15px'}
        onClick={() => openModal()}
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
        <form onSubmit={() => console.log('Submiteado')} className='flex flex-col gap-3 '>
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
          <TextField type='text' label={'Nombre de usuario'} defaultValue={usuario} onChange = { (value)=> handleUsuario(value)} />
          <TextField type='email' label={'Correo electronico'} defaultValue={correo} onChange= { (value)=> handleCorreo(value)} />
          <TextField type='password' label={'Contraseña'} defaultValue={contrasena} onChange= { (value)=> handleContrasena(value)}  />
          <TextField type='password' label={'Confirmar contraseña'} defaultValue={confirmar}  onChange= { (value)=> handleConfirmar(value)} />

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
          <TextField type='text' label={'Nombre de usuario'} />
          <TextField type='email' label={'Correo electronico'} />
          <TextField type='password' label={'Contraseña'} />

          <div className='flex items-center justify-center mt-6'>
            <Button onClick={() => openDetalles.closeModal()} value={'Cerrar'} type='contained' />
          </div>
        </form>
      </Modal>

      {/* Modal Edicion */}
      <Modal isOpen={openEdicion.isOpen} isClosing={openEdicion.isClosing} closeModal={openEdicion.closeModal}>
        <form onSubmit={() => console.log('Submiteado')} className='flex flex-col gap-3 '>
          <Box
            display={'flex'}
            component={'button'}
            onClick={() => openEdicion.closeModal()}
            flexDirection={'row'}
            marginBottom={'20px'}
            alignItems={'center'}
            gap={'10px'}
          >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Editar información</p>
          </Box>
          <TextField type='text' label={'Nombre de usuario'} />
          <TextField type='email' label={'Correo electronico'} />
          <TextField type='password' label={'Nueva contraseña'} />
          <TextField type='password' label={'Confirmar nueva contraseña'} />

          <div className='flex items-center justify-center mt-6'>
            <Button value={'Guardar'} type='contained' />
          </div>
        </form>
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
          <Button onClick={eliminarFila} value={'Eliminar'} type='contained' />
        </div>
      </Modal>
    </Box>
  );
};

export default Page;

