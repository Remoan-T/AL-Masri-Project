// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getFarmData = createAsyncThunk('appfarm/getFarmData ', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-request-farms', {
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


export const getDeletedFarms = createAsyncThunk('appfarm/getDeletedFarms', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-farm-trashed', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        deletedFarms: response.data
    }

})
export const getAvailableFarms = createAsyncThunk('appfarm/getAvailableFarms', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/get-farms', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        AvailableFarms: response.data
    }

})
////////////////////////////////////////////////REMOVE FARM/////////////////////////
export const removeFarm = createAsyncThunk('appfarm/removeFarm', async id => {
    await axios.delete(`http://127.0.0.1:8000/sales-api/soft-delete-farm/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return response.data
})

export const appFarmSlice = createSlice({
    name: 'appfarm',
    initialState: {
        data: [],
        deletedFarms: [],
        AvailableFarms: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getFarmData.fulfilled, (state, action) => {
            state.data = action.payload.data
            console.log(state.data)
            //   state.params = action.payload.params
        })
        builder.addCase(getDeletedFarms.fulfilled, (state, action) => {
            state.deletedFarms = action.payload.deletedFarms
            console.log(state.deletedFarms)
            //   state.params = action.payload.params
        })
        builder.addCase(getAvailableFarms.fulfilled, (state, action) => {
            state.AvailableFarms = action.payload.AvailableFarms
            console.log("🚀 ~ file: index.js:78 ~ builder.addCase ~ action.payload.data:", action.payload.AvailableFarms)
            console.log(state.AvailableFarms)
            //   state.params = action.payload.params
        })
            .addCase(removeFarm.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.AvailableFarms = state.AvailableFarms.filter(AvailableFarm => AvailableFarm.id !== action.payload.id);
            })
    }
})

export default appFarmSlice.reducer
