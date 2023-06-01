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
      const managingLevel1 = action.payload.managing_level
      let ability1 = []
      if (managingLevel1 == 'Purchasing-and-Sales-manager') {
        ability1 = [
          {
            action: 'manage',
            subject: 'ceo'
          }
        ]
      }
      else if (managingLevel1 == 'Mechanism-Coordinator') {
        ability1 = [
          {
            action: 'manage',
            subject: 'mc'
          }
        ]
      }
      else if (managingLevel1 == 'libra-commander') {
        ability1 = [
          {
            action: 'manage',
            subject: 'lc'
          }
        ]
      } else if (managingLevel1 == 'slaughter_supervisor') {
        ability1 = [
          {
            action: 'manage',
            subject: 'ss'
          }
        ]
      } else if (managingLevel1 == 'cutting_supervisor') {
        ability1 = [
          {
            action: 'manage',
            subject: 'cs'
          }
        ]
      }
      else if (managingLevel1 == 'warehouse_supervisor') {
        ability1 = [
          {
            action: 'manage',
            subject: 'ws'
          }
        ]
      }
      else {
        ability1 = [
          {
            action: 'read',
            subject: 'dashboard'
          }
        ];
      }
      // console.log(action.payload)
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      // state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      //  localStorage.setItem(action,"manage")
      //  localStorage.setItem(action,"manage")

      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem('accessToken', (action.payload.token))
      console.log(action.payload.token)
      localStorage.setItem('managing_level', JSON.stringify(action.payload.managing_level))
      localStorage.setItem('ability', JSON.stringify(ability1))
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
