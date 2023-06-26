// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getManagingLevels = createAsyncThunk('ceo/getManagingLevels', async () => {
    const response = await axios.get('http://127.0.0.1:8000/ceo-api/ceo/display-managing-level', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        managingLevels : response.data
    }

})


export const getUsersData= createAsyncThunk('ceo/getUsersData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/ceo-api/ceo/display-user', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        usersData: response.data
    }

})

export const getRequests= createAsyncThunk('ceo/getRequests', async () => {
    const response = await axios.get('http://127.0.0.1:8000/ceo-api/ceo/display-request', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    console.log(response.data)
    return {
        requests: response.data
    }

})

export const AcceptRequest = createAsyncThunk('ceo/AcceptRequest', async id => {
    const response = await axios.post(`http://127.0.0.1:8000/ceo-api/ceo/accept-request/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
       requests: response.data
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








export const ceoSlice = createSlice({
    name: 'ceo',
    initialState: {
       managingLevels: [],
       usersData: [],
       requests:[],
       outputManufacturingTypes:[],
       currentManufacturingOutput:[],
       manufactoringDropdown:[]

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getManagingLevels.fulfilled, (state, action) => {
            state.managingLevels = action.payload.managingLevels
           
        })
        builder.addCase(getUsersData.fulfilled, (state, action) => {
            state.usersData = action.payload.usersData
           
        })
        builder.addCase(getRequests.fulfilled, (state, action) => {
            state.requests = action.payload.requests
            console.log(state.requests)
          
           
        })
        .addCase(AcceptRequest.fulfilled, (state, action) => {
            state.status = 'succeeded';
           
        })

    }
})

export default ceoSlice.reducer
