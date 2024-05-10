import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import appareilService from './appareilService'
import {toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
appareils:[]

}
export const createappareil = createAsyncThunk('appareil/save',async(data,thunkAPI)=>{
    try {
        return  await appareilService.createAppareil(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const appareils = createAsyncThunk('appareil/getAll',async(thunkAPI)=>{
    try {
        return  await appareilService.getAppareils()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const archiveAppareil = createAsyncThunk('appareil/archivage',async(id,thunkAPI)=>{
    try {
        return  await appareilService.archiveAppareil(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const searchAppareils = createAsyncThunk('appareil/search',async(query,thunkAPI)=>{
    try {
        return  await appareilService.searchAppareil(query)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateQtyAppareil = createAsyncThunk('appareil/qtystock',async(data,thunkAPI)=>{
    try {
        return  await appareilService.updateQtyAppareil(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const appareilget = createAsyncThunk('appareilget',async(id,thunkAPI)=>{
    try {
        return  await appareilService.appareilone(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const appareilSlice = createSlice({
    name:'appareil',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createappareil.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createappareil.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.appareils = action.payload
            console.log(action.payload)
            state.isError = false
        })
        .addCase(createappareil.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(appareils.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(appareils.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.appareils =action.payload
            console.log(action.payload)
        })
        .addCase(appareils.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
        .addCase(archiveAppareil.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(archiveAppareil.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.appareilArchiver =action.payload
            console.log(action.payload)
            toast.success("Apparei Archived Success")
        })
        .addCase(archiveAppareil.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
        .addCase(searchAppareils.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(searchAppareils.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.appareils =action.payload
            console.log(action.payload)
            
        })
        .addCase(searchAppareils.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
        .addCase(updateQtyAppareil.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateQtyAppareil.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.message =action.payload
            toast.success(action.payload.message)
            
        })
        .addCase(updateQtyAppareil.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
        .addCase(appareilget.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(appareilget.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.appareils =action.payload
           
            
        })
        .addCase(appareilget.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
    }
})
export default appareilSlice.reducer 