import Image from 'next/image'
import React from 'react'

const CardDebts = ({ title, description, date, total, completada = false }) => {
  return (
    <div className='p-[10px]'>
      <div className='flex justify-between'>
        <div className='flex h-[55px]  gap-[15px] '>

          <div className='flex items-center justify-center rounded bg-[#F2F2F2] w-[40px] h-[40px]'>
            <Image width={15} height={20} alt='uparrow' src={'/songicon.svg'}></Image>
          </div>

          <div>
            <p className='text-[16px] text-azulMarino font-medium'>{title.slice(0, 25)}</p>
            <p className='text-gray-300 text-[12px]'>{description.slice(0, 25)}</p>
          </div>

        </div>
        <div className='flex flex-col '>
          {completada ? <>
            <strike className={`text-black text-[16px] text-right`}>
              {
                total > 0 ? total + '$' : total + '$'
              }
            </strike>
            <p className='text-gray-300 text-[12px] text-right'>{date}</p>
          </>
            :
            <>
              <p className={`text-red-400 text-[16px] text-right`}>
                {
                  total > 0 ? total + '$' : total + '$'
                }
              </p>
              <p className='text-gray-300 text-[12px] text-right'>{date}</p>
            </>
          }
        </div>
      </div>
      {/* Divider */}
      <div className='h-[1px] mt-[5px] mb-[5px] bg-gray-100'>
      </div>

    </div>
  )
}

export default CardDebts