import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constant";


export const GetPost = createAsyncThunk(
    'getPost/fetch',
    async (id,{ rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${baseUrl}/posts/${id}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?error.response.data: error.message);
        }
    }
);

export const GetPostSlice = createSlice({
    name:'getPost',
    initialState: {
        data: {},
        status: 'idle',
        error: null,
      },
      reducers:{},
      extraReducers: (builder)=>{
        builder
        .addCase(GetPost.pending, (state) => {
            state.status = "loading";
        })
        .addCase(GetPost.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.error = null; 
        })
        
        .addCase(GetPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message
            state.data = {}
        })
      }
})

export const GetPostReducer = GetPostSlice.reducer;