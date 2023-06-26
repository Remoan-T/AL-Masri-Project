// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'

// ** Axios Imports
import axios from 'axios'

export const getSellingReqData = createAsyncThunk('appselling/getSellingReqData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-request-selling-port', {
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


export const getDeletedSelling = createAsyncThunk('appselling/getDeletedSelling', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-selling-port-trashed', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        deletedSelling: response.data
    }

})
export const getSellingPort = createAsyncThunk('appselling/getSellingPort', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/get-selling-port', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
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
    // response.data.map(fm => console.log(fm))
    return {
        SellingPortOffer: response.data
    }

})
////////////////////////////////////////////////REMOVE pORT/////////////////////////
export const removePort = createAsyncThunk('appselling/removePort', async id => {
    const response = await axios.delete(`http://127.0.0.1:8000/sales-api/soft-delete-selling-port/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    if (response.data.status == false) toast(t => (
        <ToastError t={t} err={response.data.msg} />
      ))
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
        deletedSelling: [],
        SellingPort: [],
        SellingPortOffer:[],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSellingReqData.fulfilled, (state, action) => {
            state.data = action.payload.data

        })
        builder.addCase(getDeletedSelling.fulfilled, (state, action) => {
            state.deletedSelling = action.payload.deletedSelling

        })
        builder.addCase(getSellingPort.fulfilled, (state, action) => {
            state.SellingPort = action.payload.SellingPort
 
        })
        builder.addCase(getSellingPortOffer.fulfilled, (state, action) => {
            state.SellingPortOffer = action.payload.SellingPortOffer

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
