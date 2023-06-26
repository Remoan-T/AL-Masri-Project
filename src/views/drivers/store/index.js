// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'

// ** Axios Imports
import axios from 'axios'

export const getDriversData = createAsyncThunk('appfarm/getDriversData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/machenism-api/display-driver', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    console.log(response.data)
    // response.data.map(fm => console.log(fm))
    return {
        data: response.data
    }

})


export const getDeletedDrivers = createAsyncThunk('appfarm/getDeletedDrivers', async () => {
    const response = await axios.get('http://127.0.0.1:8000/machenism-api/display-driver-trashed', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // response.data.map(fm => console.log(fm))
    return {
        deletedDrivers: response.data
    }

})

////////////////////////////////////////////////REMOVE FARM/////////////////////////
export const removeDriver = createAsyncThunk('appfarm/removeDriver', async id => {
    const response = await axios.delete(`http://127.0.0.1:8000/machenism-api/soft-delete-driver/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    // console.log(response.data)
    if (response.data.errNum) toast(t => (
        <ToastError t={t} err={response.data.msg} />
      ))
    return response.data
})

////////////////////////////////////////////////Restore Port/////////////////////////
export const RestoreDriver = createAsyncThunk('appselling/RestoreDriver', async id => {
    await axios.post(`http://127.0.0.1:8000/machenism-api/restore-driver/${id}`, {
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
        data: [],
        deletedDrivers: [],
       
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getDriversData.fulfilled, (state, action) => {
            state.data = action.payload.data
            console.log(state.data)
            //   state.params = action.payload.params
        })
        builder.addCase(getDeletedDrivers.fulfilled, (state, action) => {
            state.deletedDrivers = action.payload.deletedDrivers
            console.log(state.deletedDrivers)
            //   state.params = action.payload.params
        })
            .addCase(removeDriver.fulfilled, (state, action) => {
                state.status = 'succeeded';
            }) 
            .addCase(RestoreDriver.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
    }
})

export default appFarmSlice.reducer
