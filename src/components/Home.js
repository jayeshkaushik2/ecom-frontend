import React, { useEffect, useState } from 'react'
import PromotedItemsList from './PromotedItemsList'
import HomeHeader from './HomeHeader'
import Box from '@mui/material/Box';


export const Home = (props) => {
  let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [HomepageData, setHomepageData] = useState(null)

  const getHomepage = async () => {
    let response = await fetch(`${API_ENDPOINT}/homepage/`)
    let data = await response.json()
    setHomepageData(data)
  }

  useEffect(() => {
    getHomepage()
  }, [])

  return (
    <Box>
      <HomeHeader HomepageData={HomepageData}/>
      <PromotedItemsList />
    </Box>
  )
}
