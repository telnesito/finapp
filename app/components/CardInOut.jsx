import Image from 'next/image'
import React from 'react'

const CardInOut = () => {
  return (
    <div className='p-[10px]'>
      <div className='flex justify-between'>
        <div className='flex h-[55px] gap-[15px] '>
          <div className='flex items-center justify-center rounded bg-[#F2F2F2] w-[40px] h-[40px]'>
            <Image width={15} height={20} alt='uparrow' src={'/songicon.svg'}></Image>
          </div>
          <div>
            <p className='text-[16px] text-azulMarino font-medium'>Spotify Subscr.</p>
            <p className='text-gray-300 text-[12px]'>Subscription</p>
          </div>

        </div>
        <div>
          <p className='text-red-400 text-[16px] text-right'>-$144.00</p>
          <p className='text-gray-300 text-[12px] text-right'>18 Sept 2019</p>
        </div>
      </div>
      {/* Divider */}
      <div className='h-[1px] mt-[5px] mb-[5px] bg-gray-100'>
      </div>
    </div>
  )
}

export default CardInOut