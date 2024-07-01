import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import articleService from './articleService'
import {toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
articles:[]

}
export const createartice = createAsyncThunk('article/save',async(data,thunkAPI)=>{
    try {
        return  await articleService.createArticle(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const articles = createAsyncThunk('articles',async(thunkAPI)=>{
      try {
          return  await articleService.articles()
      } catch (error) {
          return thunkAPI.rejectWithValue(error)
      }
  })
  export const deleteArticle = createAsyncThunk('articlesdelete',async(id,thunkAPI)=>{
    try {
        return  await articleService.deletearticle(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const articleById = createAsyncThunk('articlebyid',async(id,thunkAPI)=>{
    try {
        return  await articleService.getOnearticle(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const articleSlice = createSlice({
    name:'article',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createartice.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createartice.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.articles = [...state.articles, action.payload];
            console.log(action.payload)
            state.isError = false
            toast.success('article creer avec succees')
        })
        .addCase(createartice.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(articles.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(articles.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.articles = action.payload
            console.log(action.payload)
            state.isError = false
           
        })
        .addCase(articles.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(deleteArticle.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteArticle.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
            const deletedArticleId = action.payload._id;
            state.articles = state.articles.filter(article => article._id !== deletedArticleId);
          
           
            state.isError = false
            toast.info('article supprimé ')
           
        })
        .addCase(deleteArticle.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(articleById.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(articleById.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = true
         
            state.article = action.payload
          
           
            state.isError = false
          
           
        })
        .addCase(articleById.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
    }
})
export default articleSlice.reducer 