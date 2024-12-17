import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../components/utils/getBaseUrl";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
};

// REGISTER USER ASYNC THUNK
export const registerUserThunk = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${getBaseUrl()}/api/auth/register`, formData, {
            withCredentials: true
        });
        return response.data; // Return the response data on success
    } catch (error) {
        console.error("Registration error:", error);
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data); // Return the error message from the server
        } else {
            return rejectWithValue({ message: 'An unexpected error occurred.' }); // Fallback error message
        }
    }
});

// LOGIN USER ASYNC THUNK
export const loginUserThunk = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${getBaseUrl()}/api/auth/login`, formData, {
            withCredentials: true
        });
        return response.data; // Return the response data on success
    } catch (error) {
        console.error("Login error:", error);
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data); // Return the error message from the server
        } else {
            return rejectWithValue({ message: 'An unexpected error occurred.' }); // Fallback error message
        }
    }
});

// LOGOUT USER ASYNC THUNK
export const logoutUserThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${getBaseUrl()}/api/auth/logout`, {}, {
            withCredentials: true
        });
        return response.data; // Return the response data on success
    } catch (error) {
        console.error("Logout error:", error);
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data); // Return the error message from the server
        } else {
            return rejectWithValue({ message: 'An unexpected error occurred.' }); // Fallback error message
        }
    }
});

// CHECK USER AUTHENTICATION ASYNC THUNK
export const checkAuthThunk = createAsyncThunk('auth/checkauth', async () => {
    const response = await axios.get(`${getBaseUrl()}/api/auth/checkauth`, {
        withCredentials: true,
        headers: {
            'Cache-Control': 'no-store,no-cache, must-revalidate,proxy-revalidate',
        }
    });
    return response.data; // Return the response data on success
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:(state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Assuming the response contains user data
                state.isAuthenticated = true;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload; // Capture the error message
            })
            // FOR LOGIN THUNK
            .addCase(loginUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null; // Assuming the response contains user data
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload; // Capture the error message
            })
            // FOR CHECK USER AUTHENTICATION THUNK
            .addCase(checkAuthThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null; // Assuming the response contains user data
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload; // Capture the error message
            })
            // FOR LOGOUT THUNK
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null; // Assuming the response contains user data
                state.isAuthenticated = false;
            });
    }
});

export const { setUser , clearError } = authSlice.actions;
export default authSlice.reducer;