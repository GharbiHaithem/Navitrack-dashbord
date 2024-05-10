import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import vehiculeservice from  './vehiculeServices'

import { ToastContainer, toast } from 'react-toastify';

const initistialState ={
vehicule:[],
isError:false,
isSuccess:false,
isLoading:false,
message:'',
} 
export const registreCar = createAsyncThunk('car/register',async(data,thunkAPI)=>{
    try {
        console.log(data)
       return await vehiculeservice.createCar(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const getCars = createAsyncThunk('car/carsGetAll',async(thubkAPI)=>{
    try {
     return await vehiculeservice.getCars()   
    } catch (error) {
     return thubkAPI.rejectWithValue(error)   
    }
})
export const deleteCar = createAsyncThunk('car/delete',async(id,thunkAPI)=>{
    try {
        return await vehiculeservice.deletecar(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getCar = createAsyncThunk('car',async(id,thunkAPI)=>{
    try {
        return await vehiculeservice.getVehicule(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCar = createAsyncThunk('car/edit',async(data,thunkAPI)=>{
    try {
        return await vehiculeservice.updateVehicule(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const searchVehicule = createAsyncThunk('car/search',async(query,thunkAPI)=>{
    try {
        return await vehiculeservice.searchVehicule(query)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const vehiculesCompanie = createAsyncThunk('car/companie',async(companieId,thunkAPI)=>{
    try {
        return await vehiculeservice.getVehiculeCompanie(companieId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const vehiculesClient = createAsyncThunk('car/vehicule/client',async(nomcli,thunkAPI)=>{
    try {
        return await vehiculeservice.getVehiculeClient(nomcli)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const carSlice = createSlice({
    name:'car',
    initialState:initistialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registreCar.pending,(state)=>{
         state.isLoading = true
        })
        .addCase(registreCar.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.vehicule = action.payload.vehicule
            state.message = action.payload.message
           console.log(action.payload.vehicule)
            toast.success('Car added successfuly')
        })
        .addCase(registreCar.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = true
              state.message = action.payload.response.data.message
              toast.error(action.payload.response.data.message)
        })
        .addCase(getCars.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCars.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.vehicule = action.payload
           
        })
        .addCase(getCars.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
        .addCase(deleteCar.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCar.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.vehiculedeleted = action.payload
            console.log(state.vehiculedeleted)
           toast.warning(action.payload.message)
           state.message = action.payload.message
        })
        .addCase(deleteCar.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
        .addCase(getCar.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCar.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.vehicule = action.payload
                  })
        .addCase(getCar.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
        .addCase(updateCar.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCar.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.vehicule = action.payload
            toast.success("car updated success")
                  })
        .addCase(updateCar.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
        .addCase(searchVehicule.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(searchVehicule.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.vehicule = action.payload
           
                  })
        .addCase( searchVehicule.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
        .addCase(vehiculesCompanie.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(vehiculesCompanie.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.vehiculesCompanie = action.payload
           
                  })
        .addCase( vehiculesCompanie.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
        .addCase(vehiculesClient.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(vehiculesClient.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.vehicule = action.payload
           
                  })
        .addCase( vehiculesClient.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
             
        })
    }
})
export default carSlice.reducer;