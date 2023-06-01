// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getUnacceptableOrder = createAsyncThunk('appselling/getUnacceptableOrder', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-non-accept', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        unAcceptableOrders: response.data
    }

})
export const getRowMaterials = createAsyncThunk('appselling/getRowMaterials', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/get-row-materials', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        buyMaterials: response.data
    }

})
export const getProducts = createAsyncThunk('appselling/getProducts', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/get-products', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Products: response.data
    }

})


export const getAcceptableOrders = createAsyncThunk('appselling/getAcceptableOrders', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-accept', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    console.log(response.data)
    return {
        AcceptableOrders: response.data
    }


})
export const getSellingPort = createAsyncThunk('appselling/getSellingPort', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/get-selling-port', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
  
    return {
        SellingPort: response.data
    }

})

export const getSellingPortOffer = createAsyncThunk('appselling/getSellingPortOffer', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/get-selling-order', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        SellingPortOffer: response.data
    }

})
////////////////////////////////////////////////REMOVE pORT/////////////////////////
export const removePort = createAsyncThunk('appselling/removePort', async id => {
    await axios.delete(`http://127.0.0.1:8000/sales-api/soft-delete-selling-port/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return response.data
})
////////////////////////////////////////////////Accept Port/////////////////////////
export const AcceptPort = createAsyncThunk('appselling/AcceptPort', async id => {
    await axios.post(`http://127.0.0.1:8000/sales-api/confirm-request-register/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return response.data
})
////////////////////////////////////////////////Restore Port/////////////////////////
export const RestorePort = createAsyncThunk('appselling/RestorePort', async id => {
    await axios.post(`http://127.0.0.1:8000/sales-api/restore-selling-port/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return response.data
})
export const appSellingSlice = createSlice({
    name: 'appselling',
    initialState: {
        data: [],
        AcceptableOrders: [],
        unAcceptableOrders: [],
        SellingPort: [],
        SellingPortOffer: [],
        buyMaterials: [],
        Products: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUnacceptableOrder.fulfilled, (state, action) => {
            state.unAcceptableOrders = action.payload.unAcceptableOrders


        })
        builder.addCase(getAcceptableOrders.fulfilled, (state, action) => {
            state.AcceptableOrders = action.payload.AcceptableOrders

        })
        builder.addCase(getSellingPort.fulfilled, (state, action) => {
            state.SellingPort = action.payload.SellingPort

        })
        builder.addCase(getSellingPortOffer.fulfilled, (state, action) => {
            state.SellingPortOffer = action.payload.SellingPortOffer

        })
        builder.addCase(getRowMaterials.fulfilled, (state, action) => {
            state.buyMaterials = action.payload.buyMaterials
          
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.Products = action.payload.Products
            console.log("🚀 ~ file: index.js:78 ~ builder.addCase ~ action.payload.Products:", action.payload.Products)
        })
            .addCase(AcceptPort.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.AvailableFarms = state.AvailableFarms.filter(AvailableFarm => AvailableFarm.id !== action.payload.id);
            })
            .addCase(RestorePort.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deletedSelling = state.deletedSelling.filter(AvailableFarm => AvailableFarm.id !== action.payload.id);
            })
    }
})

export default appSellingSlice.reducer
