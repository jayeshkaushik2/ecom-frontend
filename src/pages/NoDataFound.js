import React from 'react'
import Box from '@mui/material/Box';
import No_Data_Found from '../assets/images/no_data_found.jpg'

const NoDataFound = () => {
  console.log("new 1")
  return (
    <Box>
      <img width="100%" src={No_Data_Found} alt="no data found" />
    </Box>
  )
}

export default NoDataFound