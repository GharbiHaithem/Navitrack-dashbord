import { createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import conversationService from  './conversationService'

import { ToastContainer, toast } from 'react-toastify';

const initistialState ={
conversations:[],
isError:false,
isSuccess:false,
isLoading:false,
messages:[],
message:""
} 
export const conversations = createAsyncThunk('conversations',async(thunkAPI)=>{
    try {
        return conversationService.conversations()
    } catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
}) 
export const allconversations = createAsyncThunk('allconversations',async(thunkAPI)=>{
    try {
        return conversationService.allconversations()
    } catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
}) 
export const messages = createAsyncThunk('/message', async(data,thunkAPI)=>{
    try {
     console.log(data)
       return  conversationService.getMessage(data) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) 
export const allmessages = createAsyncThunk('/allmessages', async(thunkAPI)=>{
   try {
  
      return  conversationService.getAllMessages() 
   } catch (error) {
       return thunkAPI.rejectWithValue(error)
   }
}) 
export const conversationsSlice = createSlice({
    name:'conversation',
    initialState:initistialState,
    reducers:{},
    extraReducers:builder=>{
     builder.addCase(conversations.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(conversations.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.conversations= action.payload
     })
     .addCase(conversations.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess = false
        state.isError= true
        state.message = action.error
     })
     .addCase(allconversations.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(allconversations.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.conversations= action.payload
     })
     .addCase(allconversations.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess = false
        state.isError= true
        state.message = action.error
     })          
     .addCase(messages.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(messages.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.messageC= action.payload
     })
     .addCase(messages.rejected,(state,action)=>{
      console.log(action.payload)
        state.isLoading=false
        state.isSuccess = false
        state.isError= true
        state.messages = action.payload
     })  
     .addCase(allmessages.pending,(state)=>{
      state.isLoading = true
   })
   .addCase(allmessages.fulfilled,(state,action)=>{
      console.log(action.payload)
      state.isLoading = false
      state.isSuccess = true
      state.messages= action.payload
   })
   .addCase(allmessages.rejected,(state,action)=>{
      state.isLoading=false
      state.isSuccess = false
      state.isError= true
      state.message = action.error
   })  
                 
    }
}) 
export default conversationsSlice.reducer;