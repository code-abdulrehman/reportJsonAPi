import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constant";


export const GetAllPost = createAsyncThunk(
    'getAllPost/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${baseUrl}/posts`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const GetAllPostSlice = createSlice({
    name: 'getAllPost',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(GetAllPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
                state.error = null;
            })
            .addCase(GetAllPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.data = [];
            });
    }
});

export const GetAllPostReducer = GetAllPostSlice.reducer;
