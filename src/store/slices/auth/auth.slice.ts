import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../builders/auth/auth.builder";
// import { jwtDecode } from "jwt-decode";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    userData: null,
    userOtp: null,
    userRole: "",
    isSidebarOpen: false,
}


const authenticationSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setUserData: (state, action) => {
            state.user = action.payload
        },
        setUserToken: (state, action) => {
            state.token = action.payload
        },
        handleSidebar: (state, action) => {
            console.log(action.payload, "inside slice")
            state.isSidebarOpen = action.payload
        },
        clearExtraReducers: (state) => {
            state.loading = false;
            state.error = null;
            state.user = null;
            state.token = null
            state.userOtp = null
            state.userData = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                // state.error = action.error.message as string;
            })
    }
})


export const { setUserData, setUserToken, clearExtraReducers, handleSidebar } = authenticationSlice.actions
export default authenticationSlice.reducer