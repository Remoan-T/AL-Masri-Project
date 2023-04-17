// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      console.log(action.payload)
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      // state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
    //  localStorage.setItem(action,"manage")
    //  localStorage.setItem(action,"manage")

      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem('accessToken', JSON.stringify(action.payload.token))
      localStorage.setItem('managing_level', JSON.stringify(action.payload.managing_level))
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
      
    },
    handleLogout: state => {
      state.userData = {}
      // state[config.storageTokenKeyName] = null
      // state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      // localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
