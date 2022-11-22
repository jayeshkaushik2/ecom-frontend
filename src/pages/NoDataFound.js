import React from 'react'
import Box from '@mui/material/Box';
import No_Data_Found from '../assets/images/no_data_found.jpg'

const NoDataFound = () => {
  return (
    <Box>
      <img width="fit-content" src={No_Data_Found} alt="no data found" />
    </Box>
  )
}

export default NoDataFound