'use client'

import React, { useEffect, useState } from 'react'
import Transacciones from '../components/Transacciones'
import ButtonTabs from '../components/ButtonTabs'
import CardObjetive from '../components/CardObjetive'
import Tabs from '../components/Tabs'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import useModal from '../customHooks/useModa'
import AddIcon from '@mui/icons-material/Add';
import Modal from '../components/Modal'
import TextField from '../components/TextField'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '../components/Button'
import { agregarObjetivo } from '../firebase/firestore/addObjetive'
import SuccesfullModal from '../components/SuccesfullModal'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
import { obtenerObjetivos } from '../firebase/firestore/getObjetives'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { isOpen, openModal, isClosing, closeModal } = useModal()
  const [userData, setUserData] = useState(obtenerUsuario())
  const [optionModal, setOptionModal] = useState(0)
  const modalConfirmacion = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const [objetivos, setObjetivos] = useState([])

  const router = useRouter()


  useEffect(() => {
    if (!userData) {
      router.push('/login');
    } else {
      const unsub = obtenerObjetivos(userData.uid, (objetivosData) => {
        setObjetivos(objetivosData);
      });

      // Cleanup subscription on unmount
    }

  }, [userData])

  const [newObjetivo, setNewObjetivo] = useState({
    fecha: '',
    meta: '',
    titulo: '',
    categoria: 'Entretenimiento',
    descripcion: '',
    estado: 1,
    saldoActual: '',
    porcentaje: ''
  })

  const handleGetText = (name, value) => {
    setNewObjetivo({ ...newObjetivo, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {

      const res = await agregarObjetivo(newObjetivo)
      setIsLoading(false)
      modalConfirmacion.openModal()
      setNewObjetivo({
        fecha: '',
        meta: '',
        titulo: '',
        categoria: 'Entretenimiento',
        descripcion: '',
        estado: 1,
        saldoActual: '',
        porcentaje: ''

      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[#F9FAFC] pl-[20px] pt-[20px] pr-[20px]'>
      <Box padding={'15px 15px'} onClick={() => openModal()} component={'button'} position={'fixed'} bottom={'100px'} right={'20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'60px'} height={'60px'} borderRadius={'100%'} bgcolor={'#100D40'}>
        <AddIcon sx={{
          color: 'white',
          fontSize: '30px'
        }} />
      </Box>
      <p className='text-center mt-10 font-medium text-azulMarino text-[16px]'>Objetivos</p>
      <div className='mt-10 bg-white'>
        <Tabs>
          {['Todas', 'Completados', 'En progreso'].map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        <div className='mt-4'>
          {optionModal === 0 ? <Transacciones>
            {objetivos
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map(({ descripcion, titulo, saldoActual, meta, fecha, categoria, id, estado, porcentaje }) =>

                <CardObjetive key={id} description={descripcion} total={meta} id={id} state={estado} title={titulo} category={categoria} current={saldoActual} percentaje={porcentaje} date={fecha} />
              )}

          </Transacciones>
            : optionModal === 1 ? <Transacciones>
              {objetivos
                .filter(({ porcentaje }) => porcentaje === 100)
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map(({ descripcion, titulo, saldoActual, meta, fecha, categoria, id, estado, porcentaje }) =>

                  <CardObjetive key={id} description={descripcion} total={meta} id={id} state={estado} title={titulo} category={categoria} current={saldoActual} percentaje={porcentaje} date={fecha} />
                )}

            </Transacciones>
              : <Transacciones>
                {objetivos
                  .filter(({ porcentaje }) => porcentaje !== 100)
                  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                  .map(({ descripcion, titulo, saldoActual, meta, fecha, categoria, id, estado, porcentaje }) =>

                    <CardObjetive key={id} description={descripcion} total={meta} id={id} state={estado} title={titulo} category={categoria} current={saldoActual} percentaje={porcentaje} date={fecha} />
                  )}
              </Transacciones>
          }
        </div>

        <Modal isOpen={isOpen} isClosing={isClosing} closeModal={closeModal} >

          <Box display={'flex'} component={'button'} onClick={() => closeModal()} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Agregar Objetivo</p>
          </Box>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-col gap-4'>
              <TextField onChange={(value) => handleGetText('fecha', value)} defaultValue={newObjetivo.fecha} label={'Fecha de pago'} type='date'></TextField>

              <TextField onChange={(value) => handleGetText('titulo', value)} defaultValue={newObjetivo.titulo} label={'Titulo'} type='text'></TextField>
              <TextField onChange={(value) => handleGetText('descripcion', value)} defaultValue={newObjetivo.descripcion} label={'Descripcion'} type='text'></TextField>
              <TextField min={0} onChange={(value) => handleGetText('meta', value)} defaultValue={newObjetivo.meta} label={'Total objetivo'} type='number'></TextField>
              <TextField onChange={(value) => handleGetText('saldoActual', value)} defaultValue={newObjetivo.saldoActual} label={'Saldo actual'} min={0} type='number'></TextField>

              <div>
                <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
                <select required value={newObjetivo.categoria}
                  onChange={({ target }) => handleGetText('categoria', target.value)} className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
                  <option >Comida</option>
                  <option>Entretenimiento</option>
                  <option>Transporte</option>
                  <option>Cultura</option>
                  <option>Regalos</option>
                  <option>Educacion</option>
                  <option>Ropa</option>
                  <option>Mantenimiento del hogar</option>
                  <option>Productos de belleza</option>
                  <option>Otro</option>

                </select>
              </div>
              <div className='flex mt-5 items-center justify-center'>
                <Button value={'Agregar'} type='contained' />
              </div>
            </div>
            <SuccesfullModal closeModal={modalConfirmacion.closeModal} text={'Se ha registrado un objetivo correctamente'} isOpen={modalConfirmacion.isOpen} />

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