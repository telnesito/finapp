'use client'

import React from 'react'
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
const Page = () => {

  const { isOpen, openModal, isClosing, closeModal } = useModal()

  const router = useRouter()
  return (
    <Box p={'20px 20px'}>
      <Box display={'flex'} component={'button'} onClick={() => router.push('perfil')} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
        <KeyboardArrowLeftIcon />
        <p className='text-azulMarino text-[18px] font-medium '>Gestion de contraseñas</p>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{

        }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Usuario</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="left">{'telnesito'}</TableCell>
              <TableCell align="left">{'carlosternera46@gmail.com'}</TableCell>
              <TableCell align="center" sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <RemoveRedEyeIcon />
                <EditIcon />
                <DeleteIcon />
              </TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="left">{'telnesito'}</TableCell>
              <TableCell align="left">{'carlosternera46@gmail.com'}</TableCell>
              <TableCell align="center" sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <RemoveRedEyeIcon />
                <EditIcon />
                <DeleteIcon />
              </TableCell>

            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="left">{'telnesito'}</TableCell>
              <TableCell align="left">{'carlosternera46@gmail.com'}</TableCell>
              <TableCell align="center" sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <RemoveRedEyeIcon />
                <EditIcon />
                <DeleteIcon />
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box padding={'15px 15px'} onClick={() => openModal()} component={'button'} position={'fixed'} bottom={'20px'} right={'20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'60px'} height={'60px'} borderRadius={'100%'} bgcolor={'#100D40'}>
        <AddIcon sx={{
          color: 'white',
          fontSize: '30px'
        }} />
      </Box>

      <Modal isOpen={isOpen} isClosing={isClosing} closeModal={closeModal} >
        <form onSubmit={() => console.log('Submiteado')} className='flex flex-col gap-3 '>
          <Box display={'flex'} component={'button'} onClick={() => closeModal()} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Agregar cuenta</p>
          </Box>
          <TextField type='text' label={'Nombre de usuario'} />
          <TextField type='email' label={'Correo electronico'} />
          <TextField type='password' label={'Contraseña'} />
          <TextField type='password' label={'Confirmar contraseña'} />

          <div className='flex items-center justify-center mt-6'>
            <Button value={'Guardar'} type='contained' />
          </div>
        </form>


      </Modal>

    </Box>
  )
}

export default Page