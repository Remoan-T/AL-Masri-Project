// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getSlaughterInput = createAsyncThunk('slaughter/getSlaughterInput', async () => {
    const response = await axios.get('http://127.0.0.1:8000/slaughter-supervisor-api/display-input-slaughters', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        slaughterInput: response.data
    }

})


export const getAllSlaughterData = createAsyncThunk('slaughter/getAllSlaughterData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/slaughter-supervisor-api/display-output-slaughter', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        allSlaughterData: response.data
    }

})

export const getSlaughterTypes = createAsyncThunk('slaughter/getSlaughterTypes', async () => {
    const response = await axios.get('http://127.0.0.1:8000/slaughter-supervisor-api/display-types-slaughter', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        slaughterTypes: response.data
    }

})






export const slaughterlice = createSlice({
    name: 'slaughter',
    initialState: {
        slaughterInput: [],
        allSlaughterData: [],
        slaughterTypes:[]

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSlaughterInput.fulfilled, (state, action) => {
            state.slaughterInput = action.payload.slaughterInput
            console.log(state.slaughterInput)
           
        })
        builder.addCase(getAllSlaughterData.fulfilled, (state, action) => {
            state.allSlaughterData = action.payload.allSlaughterData
            console.log(state.allSlaughterData)
           
        })
        builder.addCase(getSlaughterTypes.fulfilled, (state, action) => {
            state.slaughterTypes = action.payload.slaughterTypes
            console.log(action.payload.slaughterTypes)
            console.log(state.slaughterTypes)
           
        })

    }
})

export default slaughterlice.reducer
