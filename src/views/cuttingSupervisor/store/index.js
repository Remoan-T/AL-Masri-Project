// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getCuttingInput = createAsyncThunk('cutting/getCuttingInput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/cutting-supervisor-api/display-input-cutting', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
       cuttingInput: response.data
    }

})


export const getCuttingOutput = createAsyncThunk('cutting/getCuttingOutput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-output-cutting', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    console.log(response.data)
    return {
        cuttingOutput: response.data
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

export const getOutputCuttingTypes = createAsyncThunk('cutting/getOutputCuttingTypes', async () => {
    const response = await axios.get('http://127.0.0.1:8000/cutting-supervisor-api/display-type-output-cutting', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        outputTypes: response.data
    }

})

export const getCurrentOutput = createAsyncThunk('cutting/getCurrentOutput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/cutting-supervisor-api/display-output-cutting-where', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        currentOutput: response.data
    }

})


export const getCuttingDropdown = createAsyncThunk('cutting/getCuttingDropdown', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-cutting', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    console.log(response.data)
    return {
        cuttingDropdown: response.data
    }

})






export const cuttingSlice = createSlice({
    name: 'cutting',
    initialState: {
        cuttingInput: [],
        cuttingOutput: [],
        totalInput:[],
        outputTypes:[],
        currentOutput:[],
        cuttingDropdown:[]

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCuttingInput.fulfilled, (state, action) => {
            state.cuttingInput = action.payload.cuttingInput
           
        })
        builder.addCase(getCuttingOutput.fulfilled, (state, action) => {
            state.cuttingOutput = action.payload.cuttingOutput
           
        })
        builder.addCase(getTotalInput.fulfilled, (state, action) => {
            state.totalInput = action.payload.totalInput
          
           
        })
        builder.addCase(getOutputCuttingTypes.fulfilled, (state, action) => {
            state.outputTypes = action.payload.outputTypes
    
           
        })
        builder.addCase(getCurrentOutput.fulfilled, (state, action) => {
            state.currentOutput = action.payload.currentOutput
          
           
        })
        builder.addCase(getCuttingDropdown.fulfilled, (state, action) => {
            state.cuttingDropdown = action.payload.cuttingDropdown
            console.log(state.cuttingDropdown)
           
        })

    }
})

export default cuttingSlice.reducer
