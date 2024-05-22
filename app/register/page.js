'use client'
import React, { useState } from 'react'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import { registrarUsuario } from '../firebase/auth/register'
import useModal from '../customHooks/useModa'
import { Backdrop, CircularProgress } from '@mui/material'
import ErrorModal from '../components/ErrorModal'
import { Modal } from '@mui/material'


const Page = () => {
  const router = useRouter()

  const { isOpen, closeModal, openModal } = useModal()
  const [errorRecived, setErrorRecived] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const ToS = useModal()
  const [newUser, setNewUser] = useState({
    email: '', password: '', username: ''
  })
  // Manejo del valor de los inputs
  const handleGetText = (name, value) => {
    setNewUser({ ...newUser, [name]: value });
  };

  // Manejo del registro
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await registrarUsuario(newUser.email, newUser.password, newUser.username)
    console.log(res)
    setIsLoading(false)
    if (res.uid) router.push('accountcreated')
    else {
      // ErrorRecived es el objeto error que viene de firebase
      setErrorRecived(res.code)
      openModal()
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='p-5 gap-[50px] min-h-[700px] flex flex-col items-center justify-center h-screen animate-fade-aparecer'>

        <p className='font-semibold text-[24px] text-azulMarino'>Bienvenido !</p>
        <div className='flex flex-col gap-3 w-full max-w-[700px]'>
          <TextField defaultValue={newUser.username} onChange={(value) => handleGetText('username', value)} type='text' label={'Nombre completo'} />
          <TextField defaultValue={newUser.email} onChange={(value) => handleGetText('email', value)} type='email' label={'Correo electronico'} />
          <TextField defaultValue={newUser.password} onChange={(value) => handleGetText('password', value)} type='password' label={'Contraseña'} />
        </div>
        <div className='flex gap-2 items-start w-full max-w-[700px]'>
          <input required id='check' name='check' type='checkbox'></input>
          <label className='text-azulMarino font-medium text-[12px]' htmlFor='check'>Ya leí y acepto los <span onClick={() => {
            ToS.openModal()
          }} className='underline'>
            términos y condiciones
          </span></label>
        </div>

        <div className='flex flex-col md:flex-row gap-[15px]'>
          <Button value={'Crear cuenta'} type='contained' />
          <Button onClick={() => router.push('/')} value={'Ir al tutorial'} type='outlined' />
        </div>

        <p className='text-azulMarino'>Ya te has creado una cuenta ? <span onClick={() => router.push('/login')} className='text-azulMarino font-medium'>Inicia sesion</span></p>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ErrorModal closeModal={closeModal} text={errorRecived} isOpen={isOpen} openModal={openModal} />

      <Modal open={ToS.isOpen} onClose={ToS.closeModal} >
        <div className="flex h-screen flex-col items-center justify-center ">
          <div className='p-[20px] container w-11/12 h-5/6 rounded-lg  overflow-scroll bg-white '>
            <p className='p-5' onClick={() => ToS.closeModal()}>[x] Cerrar</p>
            <h1 class="text-3xl font-bold mb-4">Términos y Condiciones de Uso</h1>

            <p class="mb-4">
              Bienvenido a FinApp, una aplicación web de gestión financiera desarrollada por
              <span class="font-semibold">Finapp Network</span>.
            </p>

            <p class="mb-4">
              Al utilizar la aplicación FinApp, aceptas los siguientes términos y condiciones
              de uso. Si no estás de acuerdo con estos términos y condiciones, por favor no
              utilices la aplicación.
            </p>

            <ol class="list-decimal list-inside mb-4">
              <li class="mb-2">
                <span class="font-semibold">Uso de la Aplicación</span>
                <ol class="list-decimal list-inside ml-4">
                  <li class="mb-1">
                    FinApp es una herramienta diseñada para ayudar a los usuarios a gestionar
                    sus finanzas personales de manera efectiva. Al utilizar FinApp, aceptas
                    utilizar la aplicación únicamente con fines personales y no comerciales.
                  </li>
                  <li>
                    Te comprometes a proporcionar información precisa y actualizada al
                    utilizar FinApp, incluyendo datos financieros, personales y cualquier
                    otra información requerida para el correcto funcionamiento de la
                    aplicación.
                  </li>
                </ol>
              </li>
              <li class="mb-2">
                <span class="font-semibold">Privacidad y Seguridad</span>
                <ol class="list-decimal list-inside ml-4">
                  <li class="mb-1">
                    Respetamos tu privacidad y nos comprometemos a proteger tus datos
                    personales de acuerdo con nuestra Política de Privacidad, la cual puedes
                    encontrar en
                    <a href="[enlace a la política de privacidad]" class="text-blue-500 hover:underline"
                    >[enlace a la política de privacidad]</a
                    >.
                  </li>
                  <li>
                    Nos esforzamos por mantener la seguridad de tus datos financieros y
                    personales mediante el uso de medidas de seguridad adecuadas. Sin
                    embargo, no podemos garantizar la seguridad absoluta de la información
                    transmitida a través de Internet.
                  </li>
                </ol>
              </li>
              <li class="mb-2">
                <span class="font-semibold">Responsabilidad del Usuario</span>
                <ol class="list-decimal list-inside ml-4">
                  <li class="mb-1">
                    Eres el único responsable de cualquier acción que realices mientras
                    utilices FinApp, incluyendo el uso de tu información financiera y la
                    toma de decisiones basadas en las recomendaciones proporcionadas por la
                    aplicación.
                  </li>
                  <li>
                    Aceptas no utilizar FinApp de manera que pueda interferir con el
                    funcionamiento adecuado de la aplicación o causar daño a otros usuarios
                    o a la empresa.
                  </li>
                </ol>
              </li>
              <li class="mb-2">
                <span class="font-semibold">Limitación de Responsabilidad</span>
                <ol class="list-decimal list-inside ml-4">
                  <li class="mb-1">
                    En ningún caso, seremos responsables ante ti o cualquier tercero por
                    cualquier daño directo, indirecto, incidental, especial, o consecuente
                    que surja del uso o la imposibilidad de usar FinApp, incluso si se ha
                    informado previamente sobre la posibilidad de tales daños.
                  </li>
                  <li>
                    Finapp Network no garantiza la exactitud, integridad o
                    confiabilidad de la información proporcionada por FinApp, y no seremos
                    responsables de ningún error u omisión en dicha información.
                  </li>
                </ol>
              </li>
              <li>
                <span class="font-semibold">Modificaciones a los Términos y Condiciones</span>
                <p class="ml-4">
                  Nos reservamos el derecho de modificar estos términos y condiciones en
                  cualquier momento. Los cambios entrarán en vigencia inmediatamente
                  después de su publicación en la aplicación. Se te notificará sobre
                  cualquier cambio significativo en los términos y condiciones.
                </p>
              </li>
            </ol>

            <p class="mb-4">
              Al utilizar FinApp, aceptas estar sujeto a estos términos y condiciones de
              uso. Si tienes alguna pregunta sobre estos términos y condiciones, por favor
              contáctanos.
            </p>
          </div>
        </div>
      </Modal>

    </form>


  )
}

export default Page