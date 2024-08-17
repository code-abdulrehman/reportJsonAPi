import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../constant';

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
    reducers: {
        setPostLocally: (state, action) => {
            state.data.push(action.payload);
        },
        updatePostLocally: (state, action) => {
            const index = state.data.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        removePostLocally: (state, action) => {
            state.data = state.data.filter(post => post.id !== action.payload);
        }
    },
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

export const { setPostLocally, updatePostLocally, removePostLocally } = GetAllPostSlice.actions;

export const GetAllPostReducer = GetAllPostSlice.reducer;
