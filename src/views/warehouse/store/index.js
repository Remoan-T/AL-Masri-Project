// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getWarehouseWithDetails = createAsyncThunk('warehouse/getWarehouseWithDetails', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-warehouse-with-details', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        warehouseDetails: response.data
    }

})


export const getdisplaycommands = createAsyncThunk('cutting/getCuttingOutput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-commands', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        getdisplaycommands: response.data
    }

})

export const getTotalInput = createAsyncThunk('cutting/getTotalInput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/cutting-supervisor-api/display-total-input', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        totalInput: response.data
    }

})






export const cuttingSlice = createSlice({
    name: 'cutting',
    initialState: {
        warehouseDetails: [],
        cuttingOutput: [],
        totalInput: [],
        isOpen: false,

    },
    reducers: {
        openDialog: (state) => {
            state.isOpen = true;
            console.log(state.isOpen)
        },
        closeDialog: (state) => {
            state.isOpen = false;

        },
    },
    extraReducers: builder => {
        builder.addCase(getWarehouseWithDetails.fulfilled, (state, action) => {
            state.warehouseDetails = action.payload.warehouseDetails
            console.log(state.warehouseDetails)


        })



    }
})
export const { openDialog, closeDialog } = cuttingSlice.actions;

export default cuttingSlice.reducer
