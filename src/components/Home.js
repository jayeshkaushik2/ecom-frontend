import React, { useEffect, useState } from 'react'
import PromotedItemsList from './PromotedItemsList'
import HomeHeader from './HomeHeader'
import Box from '@mui/material/Box';


export const Home = (props) => {
  let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  

  return (
    <Box>
      <HomeHeader />
      <PromotedItemsList />
    </Box>
  )
}
