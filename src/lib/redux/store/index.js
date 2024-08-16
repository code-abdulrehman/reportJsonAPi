import { configureStore } from "@reduxjs/toolkit";
import { GetAllPostReducer } from "../Slice/GetAllPostSlice";
import { GetPostReducer } from "../Slice/GetPostSlice";
import { SetPostReducer } from "../Slice/SetPostSlice";
import { DeletePostReducer } from "../Slice/DeletePostSlice";
import { UpdatePostReducer } from "../Slice/UpdatePostSlice";

export const store = configureStore({
    reducer:{
        getAllPost:GetAllPostReducer,
        getPost:GetPostReducer,
        setPost:SetPostReducer,
        deletePost: DeletePostReducer,
        updatePost:UpdatePostReducer,

    }
})