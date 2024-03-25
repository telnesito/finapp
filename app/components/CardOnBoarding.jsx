'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import { onBoarding } from '../utils/onBoardingText'
import { useRouter } from 'next/navigation'
import { Popins } from '../utils/fuentes'
const CardOnBoarding = () => {
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const handlePrimary = () => {

    if (index !== 2) {
      setIndex((prev) => prev + 1)
    } else {
      router.push('/register')
    }
  }

  const handleSecondary = () => {

    if (index !== 2) {
      setIndex(2)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className={`${Popins.className} flex flex-col min-h-max items-center justify-center gap-10 animate-fade-aparecer`}>
      <Image alt='Imagenes de onboard' width={252} height={227} src={onBoarding[index].image}>

      </Image>
      <h1 className='font-semibold text-center text-azulMarino text-[30px] '>{onBoarding[index].title}</h1>
      <p className='text-center text-Gris'>{onBoarding[index].descripcion}</p>
      <div className='flex gap-3'>
        {onBoarding.map((obj, indexBoard) => <span onClick={() => setIndex(indexBoard)} key={indexBoard} className={`cursor-pointer rounded-full w-[12px] h-[12px] ${indexBoard === index ? 'bg-azulMarino' : 'bg-GrisClaro'}`}>
        </span>)}

      </div>

      <div className=' sm:flex-col flex flex-col lg:flex-row'>
        <Button type='contained' onClick={handlePrimary} value={onBoarding[index].primaryText} />

        <Button type='text' onClick={handleSecondary} value={onBoarding[index].secondaryText} />
      </div>
    </div>
  )
}

export default CardOnBoarding