// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'

// ** Axios Imports
import axios from 'axios'

export const getDeletedTrucks = createAsyncThunk('appfarm/getDeletedTrucks', async () => {
    const response = await axios.get('http://127.0.0.1:8000/machenism-api/display-truck-trashed', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        deletedTrucks: response.data
    }

})
export const getAvailableTrucks = createAsyncThunk('appfarm/getAvailableTrucks', async () => {
    const response = await axios.get('http://127.0.0.1:8000/machenism-api/display-trucks', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        AvailableTrucks: response.data
    }

})

////////////////////////////////////////////////REMOVE FARM/////////////////////////
export const removeTruck = createAsyncThunk('appfarm/removeTruck', async id => {
   const response = await axios.delete(`http://127.0.0.1:8000/machenism-api/soft-delete-truck/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    if (response.data.errNum) toast(t => (
        <ToastError t={t} err={response.data.msg} />
      ))
    return response.data
})

////////////////////////////////////////////////Restore Port/////////////////////////
export const RestoreTruck = createAsyncThunk('appselling/RestoreTruck', async id => {
    await axios.post(`http://127.0.0.1:8000/machenism-api/restore-truck/${id}`, {
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
        deletedTrucks: [],
        AvailableTrucks: [],
    },
    reducers: {},
    extraReducers: builder => {
       
        builder.addCase(getDeletedTrucks.fulfilled, (state, action) => {
            state.deletedTrucks = action.payload.deletedTrucks
            console.log(state.deletedTrucks)
            //   state.params = action.payload.params
        })
        
        builder.addCase(getAvailableTrucks.fulfilled, (state, action) => {
            state.AvailableTrucks = action.payload.AvailableTrucks
            console.log("🚀 ~ file: index.js:78 ~ builder.addCase ~ action.payload.data:", action.payload.AvailableTrucks)
            console.log(state.AvailableTrucks)
            //   state.params = action.payload.params
        })
            .addCase(removeTruck.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.AvailableTrucks = state.AvailableTrucks.filter(AvailableTrucks => AvailableTrucks.id !== action.payload.id);
            })
           
            .addCase(RestoreTruck.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deletedTrucks = state.deletedTrucks.filter( deletedTrucks=> deletedTrucks.id !== action.payload.id);
            })
    }
})

export default appFarmSlice.reducer
