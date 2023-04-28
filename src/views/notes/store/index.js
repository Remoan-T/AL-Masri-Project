// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getNoteData = createAsyncThunk('appfarm/getNoteData ', async () => {
    const response = await axios.get('http://127.0.0.1:8000/sales-api/display-notes', {
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


////////////////////////////////////////////////REMOVE FARM/////////////////////////
export const removeNote = createAsyncThunk('appfarm/removeNote', async id => {
    await axios.delete(`http://127.0.0.1:8000/sales-api/delete-note/${id}`, {
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
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNoteData.fulfilled, (state, action) => {
            state.data = action.payload.data
            console.log(state.data)
            //   state.params = action.payload.params
        })
        
            .addCase(removeNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            
    }
})

export default appFarmSlice.reducer
