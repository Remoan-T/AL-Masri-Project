// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'

// ** Axios Imports
import axios from 'axios'

export const displayWarehouseContent = createAsyncThunk('appselling/displayWarehouseContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-warehouse-content', {
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


export const displayCommandsToWarehouse = createAsyncThunk('appselling/displayCommandsToWarehouse', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-commands-to-warehouse', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        Commands: response.data
    }

})
export const displayTypeOutput = createAsyncThunk('appselling/displayTypeOutput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/production-api/display-type-output', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        OutputType: response.data
    }

})


export const appSellingSlice = createSlice({
    name: 'appselling',
    initialState: {
        data: [],
        Commands: [],
        OutputType: [],

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(displayWarehouseContent.fulfilled, (state, action) => {
            state.data = action.payload.data

        })
        builder.addCase(displayCommandsToWarehouse.fulfilled, (state, action) => {
            state.Commands = action.payload.Commands

        })
        builder.addCase(displayTypeOutput.fulfilled, (state, action) => {
            state.OutputType = action.payload.OutputType

        })
    }
})

export default appSellingSlice.reducer
