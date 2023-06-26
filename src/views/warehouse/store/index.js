// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getWarehouseWithDetails = createAsyncThunk('warehouse/getWarehouseWithDetails', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-warehouse-with-details', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        warehouseDetails: response.data
    }

})


export const getdisplaycommands = createAsyncThunk('cutting/getdisplaycommands', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-commands', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        displaycommands: response.data
    }

})

export const DisplayLakeContent = createAsyncThunk('cutting/DisplayLakeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-lake-content', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        LakeContent: response.data
    }

})

export const DisplayInputLakeContent = createAsyncThunk('cutting/DisplayInputLakeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-lake-input-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        InputLakeContent: response.data
    }

})
export const DisplayOutputLakeContent = createAsyncThunk('cutting/DisplayOutputLakeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-lake-output-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        OutputLakeContent: response.data
    }

})

export const DisplayDropdawnZeroFrigeContent = createAsyncThunk('cutting/DisplayDropdawnZeroFrigeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-lakes', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        DropdawnZeroFrigeContent: response.data
    }

})
export const DisplayDropdawnCommandsContent = createAsyncThunk('cutting/DisplayDropdawnCommandsContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/get-production-command', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        CommandContent: response.data
    }

})

export const cuttingSlice = createSlice({
    name: 'cutting',
    initialState: {
        warehouseDetails: [],
        cuttingOutput: [],
        LakeContent: [],
        InputLakeContent: [],
        OutputLakeContent: [],
        ZeroFrigeContent: [],
        CommandContent: [],
        DropdawnZeroFrigeContent: [],
        OutputZeroFrigeContent: [],
        InputZeroFrigeContent: [],
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
        builder.addCase(getWarehouseWithDetails.fulfilled, (state, action) => {
            state.warehouseDetails = action.payload.warehouseDetails
            console.log(state.warehouseDetails)


        })
        builder.addCase(DisplayDropdawnCommandsContent.fulfilled, (state, action) => {
            state.CommandContent = action.payload.CommandContent
            console.log(state.CommandContent)


        })

        builder.addCase(getdisplaycommands.fulfilled, (state, action) => {
            state.displaycommands = action.payload.displaycommands
            console.log(state.displaycommands)


        })
        builder.addCase(DisplayLakeContent.fulfilled, (state, action) => {
            state.LakeContent = action.payload.LakeContent
            console.log(state.LakeContent)


        })
        builder.addCase(DisplayInputLakeContent.fulfilled, (state, action) => {
            state.InputLakeContent = action.payload.InputLakeContent
            console.log(state.InputLakeContent)


        })
        builder.addCase(DisplayOutputLakeContent.fulfilled, (state, action) => {
            state.OutputLakeContent = action.payload.OutputLakeContent
            console.log(state.OutputLakeContent)
        })
        builder.addCase(DisplayDropdawnZeroFrigeContent.fulfilled, (state, action) => {
            state.DropdawnZeroFrigeContent = action.payload.DropdawnZeroFrigeContent
            console.log(state.DropdawnZeroFrigeContent)
        })
    }
})
export const { openDialog, closeDialog } = cuttingSlice.actions;

export default cuttingSlice.reducer
