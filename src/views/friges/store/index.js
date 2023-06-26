// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


export const DisplayZeroFrigeContent = createAsyncThunk('cutting/DisplayZeroFrigeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-zero-frige-content', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        ZeroFrigeContent: response.data
    }

})
export const DisplayInputZeroFrigeContent = createAsyncThunk('cutting/DisplayInputZeroFrigeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-zero-input-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        InputZeroFrigeContent: response.data
    }

})
export const DisplayOutputZeroFrigeContent = createAsyncThunk('cutting/DisplayOutputZeroFrigeContent', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-zero-output-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        OutputZeroFrigeContent: response.data
    }

})
export const Dropdownfrige0content = createAsyncThunk('cutting/Dropdownfrige0content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-zero', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        dropdown0: response.data
    }

})
///////////////////////////////////////////////////////////////Frige1///////////////////

export const Displayfrige1content = createAsyncThunk('cutting/Displayfrige1content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-det-1-content', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        frige1content: response.data
    }

})
export const DisplayOutputfrige1content = createAsyncThunk('cutting/DisplayOutputfrige1content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-det1-output-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Outputfrige1content: response.data
    }

})
export const DisplayInputfrige1content = createAsyncThunk('cutting/DisplayInputfrige1content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-det1-input-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Inputfrige1content: response.data
    }

})
export const Dropdownfrige1content = createAsyncThunk('cutting/Dropdownfrige1content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-det1', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        dropdownfrige1content: response.data
    }

})
///////////////////////////////////////////////////////////////Frige2///////////////////

export const Displayfrige2content = createAsyncThunk('cutting/Displayfrige2content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-det-2-content', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        frige2content: response.data
    }

})
export const DisplayOutputfrige2content = createAsyncThunk('cutting/DisplayOutputfrige2content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-det2-output-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Outputfrige2content: response.data
    }

})
export const DisplayInputfrige2content = createAsyncThunk('cutting/DisplayInputfrige2content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-det2-input-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Inputfrige2content: response.data
    }

})
export const Dropdownfrige2content = createAsyncThunk('cutting/Dropdownfrige2content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-det2', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        dropdownfrige2content: response.data
    }

})
///////////////////////////////////////////////////////////////Frige 3 ///////////////////

export const Displayfrige3content = createAsyncThunk('cutting/Displayfrige3content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/display-det-3-content', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        frige3content: response.data
    }

})
export const DisplayOutputfrige3content = createAsyncThunk('cutting/DisplayOutputfrige3content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-det3-output-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Outputfrige3content: response.data
    }

})
export const DisplayInputfrige3content = createAsyncThunk('cutting/DisplayInputfrige3content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/warehouse-supervisor-api/display-det3-input-mov', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        Inputfrige3content: response.data
    }

})
export const Dropdownfrige3content = createAsyncThunk('cutting/Dropdownfrige3content', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/drop-down-from-det3', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`

        }
    })
    return {
        dropdownfrige3content: response.data
    }

})
/////////////////////////////////////////////////////////////////////////////////////////////
export const cuttingSlice = createSlice({
    name: 'cutting',
    initialState: {
        ZeroFrigeContent: [],
        OutputZeroFrigeContent: [],
        OneFrigeContent: [],
        InputZeroFrigeContent: [],
        Inputfrige1content: [],
        Outputfrige1content: [],
        frige1content: [],
        Inputfrige2content: [],
        Outputfrige2content: [],
        frige2content: [],
        Inputfrige3content: [],
        Outputfrige3content: [],
        frige3content: [],
        dropdown0: [],
        dropdownfrige1content: [],
        dropdownfrige2content: [],
        dropdownfrige3content: [],
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

        builder.addCase(DisplayZeroFrigeContent.fulfilled, (state, action) => {
            state.ZeroFrigeContent = action.payload.ZeroFrigeContent
            console.log(state.ZeroFrigeContent)
        })

        builder.addCase(DisplayInputZeroFrigeContent.fulfilled, (state, action) => {
            state.InputZeroFrigeContent = action.payload.InputZeroFrigeContent
            console.log(state.InputZeroFrigeContent)
        })

        builder.addCase(DisplayOutputZeroFrigeContent.fulfilled, (state, action) => {
            state.OutputZeroFrigeContent = action.payload.OutputZeroFrigeContent
            console.log(state.OutputZeroFrigeContent)
        })
        builder.addCase(Dropdownfrige0content.fulfilled, (state, action) => {
            state.dropdown0 = action.payload.dropdown0
            console.log(state.dropdown0)
        })

        ///////////////////////////////////////////////////////1 Frige//////////////////

        builder.addCase(Displayfrige1content.fulfilled, (state, action) => {
            state.OneFrigeContent = action.payload.frige1content
            console.log(state.OneFrigeContent)
        })

        builder.addCase(DisplayInputfrige1content.fulfilled, (state, action) => {
            state.Inputfrige1content = action.payload.Inputfrige1content
            console.log(state.Inputfrige1content)
        })

        builder.addCase(DisplayOutputfrige1content.fulfilled, (state, action) => {
            state.Outputfrige1content = action.payload.Outputfrige1content
            console.log(state.Outputfrige1content)
        })
        builder.addCase(Dropdownfrige1content.fulfilled, (state, action) => {
            state.dropdownfrige1content = action.payload.dropdownfrige1content
            console.log(state.dropdownfrige1content)
        })
        ///////////////////////////////////////////////////////2 Frige//////////////////

        builder.addCase(Displayfrige2content.fulfilled, (state, action) => {
            state.frige2content = action.payload.frige2content
            console.log(state.frige2content)
        })

        builder.addCase(DisplayInputfrige2content.fulfilled, (state, action) => {
            state.Inputfrige2content = action.payload.Inputfrige2content
            console.log(state.Inputfrige2content)
        })

        builder.addCase(DisplayOutputfrige2content.fulfilled, (state, action) => {
            state.Outputfrige2content = action.payload.Outputfrige2content
            console.log(state.Outputfrige2content)
        })
        builder.addCase(Dropdownfrige2content.fulfilled, (state, action) => {
            state.dropdownfrige2content = action.payload.dropdownfrige2content
            console.log(state.dropdownfrige2content)
        })
        ///////////////////////////////////////////////////////3 Frige//////////////////

        builder.addCase(Displayfrige3content.fulfilled, (state, action) => {
            state.frige3content = action.payload.frige3content
            console.log(state.frige3content)
        })

        builder.addCase(DisplayInputfrige3content.fulfilled, (state, action) => {
            state.Inputfrige3content = action.payload.Inputfrige3content
            console.log(state.Inputfrige3content)
        })

        builder.addCase(DisplayOutputfrige3content.fulfilled, (state, action) => {
            state.Outputfrige3content = action.payload.Outputfrige3content
            console.log(state.Outputfrige3content)
        })
        builder.addCase(Dropdownfrige3content.fulfilled, (state, action) => {
            state.dropdownfrige3content = action.payload.dropdownfrige3content
            console.log(state.dropdownfrige3content)
        })
    }
})
export const { openDialog, closeDialog } = cuttingSlice.actions;
export default cuttingSlice.reducer
