import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { whoami } from '../http'
import { setAuth } from '../Redux/Slices/authSlice'
import Cookies from 'universal-cookie';

function RefreshTokenHandler() {
  const [loading, setLoading] = useState(true)
  const cookie = new Cookies();

  const refreshToken = cookie.get('refreshToken');
  const accessToken = cookie.get('accessToken');

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, status } = await whoami()
        if (status === 200) {
          setLoading(false)

          if (refreshToken && accessToken) {
            dispatch(setAuth({
              user: data.data.user,
              isAuthenticated: true
            }))
            setLoading(false)

          }
        }
      } catch (error) {
        console.log(error)
        setLoading(false)

      }
    }
    fetchData()
  }, [])

  return {
    loading
  }
}

export default RefreshTokenHandler





