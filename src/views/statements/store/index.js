// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getStatements = createAsyncThunk('appfarm/getStatements', async () => {
    const response = await axios.get('http://127.0.0.1:8000/libra-api/get-reciepts', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        data: response.data
    }

})
export const getTrips = createAsyncThunk('appfarm/getTrips', async () => {
    const response = await axios.get('http://127.0.0.1:8000/libra-api/display-trip-libra', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        trips: response.data
    }

})
///////////////////////////////////////////show specific Statement/////////
export const specificStatement = createAsyncThunk('appselling/specificStatement', async id => {
    await axios.get(`http://127.0.0.1:8000/libra-api/get-reciept-info/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return response.specificStatement
})


export const appFarmSlice = createSlice({
    name: 'appfarm',
    initialState: {
        data: [],
        trips: [],
        specificStatement: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStatements.fulfilled, (state, action) => {
            state.data = action.payload.data
            console.log(state.data)
            //   state.params = action.payload.params
        })
        builder.addCase(getTrips.fulfilled, (state, action) => {
            state.trips = action.payload.trips
            console.log(state.trips)
            //   state.params = action.payload.params
        })
        builder.addCase(specificStatement.fulfilled, (state, action) => {
            state.specificStatement = action.payload.specificStatement
            console.log(state.specificStatement)
            //   state.params = action.payload.params
        })
    }
})

export default appFarmSlice.reducer
