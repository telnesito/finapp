import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonLoad = () => {
  return (
    <div className='pl-[20px] pr-[20px] pt-[20px] flex flex-col gap-1'>

      <div className=' rounded flex flex-col '>
        <Skeleton sx={{ bgcolor: '#00000010', mb: '60px' }} height={60} width={260} variant='text'></Skeleton>
        <div>
          <Skeleton sx={{ bgcolor: '#00000010' }} height={30} width={160} variant='text'></Skeleton>
          <Skeleton sx={{ bgcolor: '#00000010' }} height={100} variant='rounded'></Skeleton>
        </div>
        <div className='pr-[20px] mb-[5px] pl-[20px]  h-[1px] bg-[#ffffff15]'>
        </div>
        <Skeleton sx={{ bgcolor: '#00000010' }} width={'100%'} height={60} variant='text'></Skeleton>

      </div>
      <div>
        <Skeleton sx={{ bgcolor: '#00000010' }} variant="text" width={'100%'} height={50} />
        <Skeleton sx={{ bgcolor: '#00000010' }} variant="rounded" width={'100%'} height={200} />
      </div>


      <div>
        <Skeleton sx={{ bgcolor: '#00000010' }} variant="text" width={'100%'} height={50} />
        <Skeleton sx={{ bgcolor: '#00000010' }} variant="rounded" width={'100%'} height={200} />
      </div>

      <div>
        <Skeleton sx={{ bgcolor: '#00000010' }} variant="text" width={'100%'} height={50} />
        <Skeleton sx={{ bgcolor: '#00000010' }} variant="rounded" width={'100%'} height={200} />
      </div>

    </div >

  )
}

export default SkeletonLoad