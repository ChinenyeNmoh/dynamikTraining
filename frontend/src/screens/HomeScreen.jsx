import React from 'react'
import HomeIntro from '../components/HomeIntro'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const HomeScreen = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  return (
    <div>
        <HomeIntro />

    </div>
  )
}

export default HomeScreen