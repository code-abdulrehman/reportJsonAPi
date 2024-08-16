import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constant";


export const UpdatePost = createAsyncThunk(
    'updatePost/fetch',
    async (id,updatePost,{ rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${baseUrl}/posts/${id}`,
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: updatePost
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?error.response.data: error.message);
        }
    }
);

export const UpdatePostSlice = createSlice({
    name:'updatePost',
    initialState: {
        data: {},
        status: 'idle',
        error: null,
      },
      reducers:{},
      extraReducers: (builder)=>{
        builder
        .addCase(UpdatePost.pending, (state) => {
            state.status = "loading";
        })
        .addCase(UpdatePost.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.error = null; 
        })
        
        .addCase(UpdatePost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message
            state.data = {}
        })
      }
})

export const UpdatePostReducer = UpdatePostSlice.reducer;