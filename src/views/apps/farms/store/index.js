// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getFarmData = createAsyncThunk('appfarm/getFarmData ', async () => {
  const response = await axios.get('http://127.0.0.1:8000/sales-api/get-purchase-offer', {
    headers:{
        Accept:'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`
       
    }
  })
  // response.data.map(fm => console.log(fm))
  return {
    data: response.data
  }
  
})

// export const deleteInvoice = createAsyncThunk('appInvoice/deleteInvoice', async (id, { dispatch, getState }) => {
//   await axios.delete('/apps/invoice/delete', { id })
//   await dispatch(getData(getState().invoice.params))
//   return id
// })

export const appFarmSlice = createSlice({
  name: 'appfarm',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFarmData.fulfilled, (state, action) => {
      state.data = action.payload.data
      console.log(state.data)
    //   state.params = action.payload.params
    })
  }
})

export default appFarmSlice.reducer
