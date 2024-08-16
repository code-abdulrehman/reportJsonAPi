import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constant";


export const SetPost = createAsyncThunk(
    'setPost/fetch',
    async (postData,{ rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${baseUrl}/posts`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: postData
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?error.response.data: error.message);
        }
    }
);

export const SetPostSlice = createSlice({
    name:'setPost',
    initialState: {
        data: {},
        status: 'idle',
        error: null,
      },
      reducers:{},
      extraReducers: (builder)=>{
        builder
        .addCase(SetPost.pending, (state) => {
            state.status = "loading";
        })
        .addCase(SetPost.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.error = null; 
        })
        
        .addCase(SetPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message
            state.data = {}
        })
      }
})

export const SetPostReducer = SetPostSlice.reducer;