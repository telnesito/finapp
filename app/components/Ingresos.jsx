import React from 'react'
import TextField from './TextField'
import Button from './Button'

const Ingresos = () => {
  return (
    <form className='animate-fade-aparecer mt-[15px] flex flex-col gap-2 '>
      <TextField label={'Fecha'} type='date' />
      <TextField label={'Importe'} type='number' />
      <TextField label={'Titulo'} type='text' />

      <div>
        <p className='text-GrisLabel text-[12px]'>Descripcion</p>
        <textarea required className='w-full focus:bg-white  placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]' placeholder='Descripcion' cols={'20'} rows={'4'} />
        <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
        <select required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
          <option >Salario</option>
          <option>Freelance</option>
          <option>Dinero extra</option>
          <option>Plus</option>
          <option>Otro</option>
        </select>
      </div>

      <div>
        <p className='text-GrisLabel text-[12px] mb-1'>Cuenta</p>
        <select required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
          <option >Cuentas</option>
          <option>Efectivo</option>
          <option>Tarjeta de credito</option>
        </select>
      </div>
      <div className='mt-4 flex items-center w-full justify-center'>
        <Button value={'Guardar'} type='contained' />
      </div>
    </form>
  )
}

export default Ingresos