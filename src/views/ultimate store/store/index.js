// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


export const DisplayStoreContent = createAsyncThunk('cutting/DisplayStoreContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-store-content', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        StoreContent: response.data
    }

})
export const DisplayInputStoreContent = createAsyncThunk('cutting/DisplayInputStoreContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-store-input-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        InputZeroFrigeContent: response.data
    }

})

/////////////////////////////////////////////////////////////////////////////////////////////
export const cuttingSlice = createSlice({
    name: 'cutting',
    initialState: {
        InputStorecontent: [],
        Storecontent: [],
        isOpen: false,
        id: null,
        displaycommands: [],

    },
    reducers: {
        openDialog: (state) => {
            state.isOpen = true;
            // state.id = action.payload.id
            // console.log(state.id)
        },
        closeDialog: (state) => {
            state.isOpen = false;

        },
    },
    extraReducers: builder => {
        ///////////////////////////////////////////////////////Zero Frige//////////////////

        builder.addCase(DisplayStoreContent.fulfilled, (state, action) => {
            state.Storecontent = action.payload.StoreContent
            console.log(state.Storecontent)
        })

        builder.addCase(DisplayInputStoreContent.fulfilled, (state, action) => {
            state.InputStorecontent = action.payload.InputZeroFrigeContent
            console.log(state.InputStorecontent)
        })


    }
})

export const { openDialog, closeDialog } = cuttingSlice.actions;
export default cuttingSlice.reducer
