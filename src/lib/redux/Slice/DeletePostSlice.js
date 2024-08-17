import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constant";

export const DeletePost = createAsyncThunk(
    'deletePost/fetch',
    async (id,{ rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${baseUrl}/posts/${id}`,
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?error.response.data: error.message);
        }
    }
);

export const DeletePostSlice = createSlice({
    name: 'deletePost',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DeletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Filter the deleted post out from the data array
                state.data = state.data.filter(post => post.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(DeletePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.data = [];
            });
    }
});


export const DeletePostReducer = DeletePostSlice.reducer;