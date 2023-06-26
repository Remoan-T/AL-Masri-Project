// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getSellsPort = createAsyncThunk('appDash/getSellsPort ', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/count-sellingport', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })

    return {
        sellsPort : response.data
    }

})

export const getFarmsCount= createAsyncThunk('appDash/getFarmsCount', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/count-farm', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })

    return {
        farmsCount : response.data
    }

})

export const getBestPorts= createAsyncThunk('appDash/getBestPorts', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/sort_selling_port', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })

    return {
        bestPorts : response.data
    }

})

export const getBestFarms= createAsyncThunk('appDash/getBestFarms', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/sort_farm', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })

    return {
        bestFarms : response.data
    }

})

export const getPurchaseChart= createAsyncThunk('appDash/getPurchaseChart', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/chart-purchase', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })

    return {
        purchaseChart : response.data
    }

})





export const dashSlice = createSlice({
    name: 'appDash',
    initialState: {
        sellsPort: 0,
        farmsCount:0,
        bestPorts:[],
        bestFarms:[],
        purchaseChart:[]

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSellsPort.fulfilled, (state, action) => {
            state.sellsPort = action.payload.sellsPort

        })   
        builder.addCase(getFarmsCount.fulfilled, (state, action) => {
            state.farmsCount = action.payload.farmsCount

        })  
        builder.addCase(getBestPorts.fulfilled, (state, action) => {
            state.bestPorts = action.payload.bestPorts

        })
        builder.addCase(getBestFarms.fulfilled, (state, action) => {
            state.bestFarms = action.payload.bestFarms

        })
        builder.addCase(getPurchaseChart.fulfilled, (state, action) => {
            state.purchaseChart = action.payload.purchaseChart

        })
    }
})

export default dashSlice.reducer
