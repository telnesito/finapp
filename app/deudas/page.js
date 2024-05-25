'use client'

import React, { useEffect, useState } from 'react'
import Transacciones from '../components/Transacciones'
import ButtonTabs from '../components/ButtonTabs'
import CardDebts from '../components/CardDebts'
import Tabs from '../components/Tabs'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import useModal from '../customHooks/useModa'
import AddIcon from '@mui/icons-material/Add';
import Modal from '../components/Modal'
import TextField from '../components/TextField'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '../components/Button'
import { agregarDeuda } from '../firebase/firestore/addDeuda'
import SuccesfullModal from '../components/SuccesfullModal'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
import { obtenerDeudas } from '../firebase/firestore/getDeudas'
import { useRouter } from 'next/navigation'


const Page = () => {
  const { isOpen, openModal, isClosing, closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const modalConfirmacion = useModal()
  const [userData, setUserData] = useState(obtenerUsuario())
  const [deudas, setDeudas] = useState([])

  const handleGetText = (name, value) => {
    setNewDeuda({ ...newDeuda, [name]: value });
  };

  const router = useRouter()


  useEffect(() => {
    if (!userData) {
      router.push('/login');
    } else {
      const unsub = obtenerDeudas(userData.uid, (deudaData) => {
        setDeudas(deudaData);
      });

      // Cleanup subscription on unmount
    }

  }, [userData])


  const [newDeuda, setNewDeuda] = useState({
    titulo: '',
    descripcion: '',
    monto: '',
    completada: false,
    categoria: 'Tarjeta de credito',
    fecha: ''

  })
  const [optionModal, setOptionModal] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await agregarDeuda(newDeuda)

      setIsLoading(false)
      modalConfirmacion.openModal()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-[#F9FAFC] pl-[20px] pt-[20px] pr-[20px]'>
      <Box zIndex={999} padding={'15px 15px'} onClick={() => openModal()} component={'button'} position={'fixed'} bottom={'100px'} right={'20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'60px'} height={'60px'} borderRadius={'100%'} bgcolor={'#100D40'}>
        <AddIcon sx={{
          color: 'white',
          fontSize: '30px'
        }} />
      </Box>
      <p className='text-center mt-10 font-medium text-azulMarino text-[16px]'>Deudas</p>
      <div className='mt-10 bg-white'>
        <Tabs>
          {['Todas', 'Pagadas', 'Sin pagar'].map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        <div className='mt-4'>
          {optionModal === 0 ? <Transacciones>
            {deudas
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map(({ descripcion, titulo, monto, fecha, categoria, id, completada }) =>

                <CardDebts key={id} description={descripcion} total={monto} id={id} completada={completada} title={titulo} category={categoria} date={fecha} />
              )}
          </Transacciones>
            : optionModal === 1 ? <Transacciones>

              {deudas
                .filter(({ completada }) => completada === true)
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map(({ descripcion, titulo, monto, fecha, categoria, id, completada }) =>

                  <CardDebts key={id} description={descripcion} total={monto} id={id} completada={completada} title={titulo} category={categoria} date={fecha} />
                )}


            </Transacciones>
              : <Transacciones>
                {deudas
                  .filter(({ completada }) => completada === false)
                  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                  .map(({ descripcion, titulo, monto, fecha, categoria, id, completada }) =>

                    <CardDebts key={id} description={descripcion} total={monto} id={id} completada={completada} title={titulo} category={categoria} date={fecha} />
                  )}

              </Transacciones>}
        </div>

        <Modal isOpen={isOpen} isClosing={isClosing} closeModal={closeModal} >

          <Box display={'flex'} component={'button'} onClick={() => closeModal()} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Agregar deuda</p>
          </Box>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-col gap-4'>
              <TextField onChange={(value) => handleGetText('fecha', value)} defaultValue={newDeuda.fecha} label={'Fecha de pago'} type='date'></TextField>

              <TextField onChange={(value) => handleGetText('titulo', value)} defaultValue={newDeuda.titulo} label={'Titulo'} type='text'></TextField>
              <TextField onChange={(value) => handleGetText('descripcion', value)} defaultValue={newDeuda.descripcion} label={'Descripcion'} type='text'></TextField>
              <TextField onChange={(value) => handleGetText('monto', value)} defaultValue={newDeuda.monto} label={'Total deuda'} type='number'></TextField>
              <div>
                <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
                <select value={newDeuda.categoria} onChange={({ target }) => handleGetText('categoria', target.value)} required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
                  <option >Tarjeta de credito</option>
                  <option>Servicios de streaming</option>
                  <option>Internet</option>
                  <option>Agua</option>
                  <option>Electricidad</option>
                  <option>Otro</option>

                </select>
              </div>
              <div className='flex mt-5 items-center justify-center'>
                <Button value={'Agregar'} type='contained' />
              </div>
            </div>

            <SuccesfullModal closeModal={modalConfirmacion.closeModal} text={'Se ha registrado una deuda correctamente'} isOpen={modalConfirmacion.isOpen} />

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}

            >
              <CircularProgress color="inherit" />
            </Backdrop>


          </form>


        </Modal>
      </div>
    </div>
  )
}

export default Page