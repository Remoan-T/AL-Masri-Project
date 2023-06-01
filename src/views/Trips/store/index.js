// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getTripsData = createAsyncThunk('apptrips/getTripsData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/machenism-api/display-trips', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        tripsData: response.data
    }

})
export const getOrderData = createAsyncThunk('apptrips/getOrderData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/machenism-api/display-command', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        OrderData: response.data
    }

})


export const appFarmSlice = createSlice({
    name: 'apptrips',
    initialState: {
        tripsData: [],
        OrderData: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTripsData.fulfilled, (state, action) => {
            state.tripsData = action.payload.tripsData
            console.log(state.tripsData)
            //   state.params = action.payload.params
        })
        builder.addCase(getOrderData.fulfilled, (state, action) => {
            state.OrderData = action.payload.OrderData
            console.log(state.OrderData)
            //   state.params = action.payload.params
        })
    }
})

export default appFarmSlice.reducer
