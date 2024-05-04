import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
const BackPage = ({ paginaActual, destino }) => {
  const router = useRouter()
  return (
    <Box display={'flex'} component={'button'} onClick={() => router.push(`/${destino}`)} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
      <KeyboardArrowLeftIcon />
      <p className='text-azulMarino text-[18px] font-medium '>{paginaActual}</p>
    </Box>
  )
}

export default BackPage