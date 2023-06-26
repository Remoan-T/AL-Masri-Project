// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getMunufacturingInput = createAsyncThunk('Munufacturing/getMunufacturingInput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/manufacturing-supervisor-api/display-input-munufacturing', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        munufacturingInput: response.data
    }

})


export const getMunufacturingOutput = createAsyncThunk('Munufacturing/getMunufacturingOutput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-output-manufacturing', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        munufacturingOutput: response.data
    }

})

export const getTotalManufacturingInput = createAsyncThunk('Manufacturing/getTotalManufacturingInput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/manufacturing-supervisor-api/display-total-input-munufacturing', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        totalManufacturingInput: response.data
    }

})

export const getOutputManufacturingTypes = createAsyncThunk('Manufacturing/getOutputManufacturingTypes', async () => {
    const response = await axios.get('http://127.0.0.1:8000/manufacturing-supervisor-api/display-output-type-munufacturing', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        outputManufacturingTypes: response.data
    }

})

export const getCurrentManufacturingOutput = createAsyncThunk('Manufacturing/getCurrentManufacturingOutput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/manufacturing-supervisor-api/display-output-munufacturing-where', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // console.log(response.data)
    return {
        currentManufacturingOutput: response.data
    }

})


export const getManufactoringDropdown = createAsyncThunk('Manufactoring/getManufactoringDropdown', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-manufactoring', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    console.log(response.data)
    return {
        manufactoringDropdown: response.data
    }

})






export const manufactoringSlice = createSlice({
    name: 'manufactoring',
    initialState: {
       munufacturingInput: [],
       munufacturingOutput: [],
       totalManufacturingInput:[],
       outputManufacturingTypes:[],
       currentManufacturingOutput:[],
       manufactoringDropdown:[]

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMunufacturingInput.fulfilled, (state, action) => {
            state.munufacturingInput = action.payload.munufacturingInput
           
        })
        builder.addCase(getMunufacturingOutput.fulfilled, (state, action) => {
            state.munufacturingOutput = action.payload.munufacturingOutput
           
        })
        builder.addCase(getTotalManufacturingInput.fulfilled, (state, action) => {
            state.totalManufacturingInput = action.payload.totalManufacturingInput
          
           
        })
        builder.addCase(getOutputManufacturingTypes.fulfilled, (state, action) => {
            state.outputManufacturingTypes = action.payload.outputManufacturingTypes
    
           
        })
        builder.addCase(getCurrentManufacturingOutput.fulfilled, (state, action) => {
            state.currentManufacturingOutput = action.payload.currentManufacturingOutput
            console.log(state.currentManufacturingOutput)
          
           
        })
        builder.addCase(getManufactoringDropdown.fulfilled, (state, action) => {
            state.manufactoringDropdown = action.payload.manufactoringDropdown
            console.log(state.manufactoringDropdown)
           
        })

    }
})

export default manufactoringSlice.reducer
