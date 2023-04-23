// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appInvoice/getData', async () => {
  const response = await axios.get('http://127.0.0.1:8000/sales-api/get-purchase-offer',{
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${ localStorage.getItem(accessToken) }`
   }
  })
  const data = response.data
  console.log()
  return {
    params,
    data: response.data,
    allData: response.data,
    totalPages: 15
  }
  
})

export const deleteInvoice = createAsyncThunk('appInvoice/deleteInvoice', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/invoice/delete', { id })
  await dispatch(getData(getState().invoice.params))
  return id
})

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      console.log(state)
      state.data = action.payload.data
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    })
  }
})

export default appInvoiceSlice.reducer
