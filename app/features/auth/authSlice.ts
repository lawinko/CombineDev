import { api } from "@/services/api";
import { ApiLoginParam } from "@/services/api/api.param";
import { ApiLoginPayload, ApiRefreshTokenPayload } from "@/services/api/api.payload";
import { getGeneralApiProblem } from "@/services/api/apiProblem";
import { ApiAuth } from "@/services/service.auth";
import { LoadingStatus } from "@/utils/customTypes"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    authToken: string | null,
    refreshToken?: string | null,
    status: LoadingStatus
}

export const initialState: AuthState = {
    authToken: null,
    refreshToken: null,
    status: "uninitialized"
}

export const login = createAsyncThunk(
    "auth/login",
    async (param: ApiLoginParam, { rejectWithValue }) => {
        const payload: ApiLoginPayload = {
            username: param.username,
            password: param.password
        }
        const response = await new ApiAuth().requestPostLogin(payload)

        if (response.ok) {
            return response.data
        } else {
            return rejectWithValue(getGeneralApiProblem(response))
        }
    },
)

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, { rejectWithValue, getState }) => {
        const { auth } = getState() as { auth: AuthState }
        if (!auth.refreshToken) {
            return rejectWithValue(null)
        }

        const payload: ApiRefreshTokenPayload = {
            refresh_token: auth.refreshToken
        }
        const response = await new ApiAuth().requestPostRefreshToken(payload)

        if (response.ok) {
            return response.data
        } else {
            return rejectWithValue(getGeneralApiProblem(response))
        }
    },
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        resetAuth: (state) => {
            state.authToken = null;
            state.refreshToken = null;
            state.status = "uninitialized";
        }
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(login.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = "succeeded";
            if (action.payload) {
                state.authToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                api.setAuthToken(action.payload.access_token);
            }
        });
        builder.addCase(login.rejected, (state) => {
            state.status = "failed";
        })

        //refreshToken
        builder.addCase(refreshToken.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.status = "succeeded";
            if (action.payload) {
                state.authToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
            }
        });
        builder.addCase(refreshToken.rejected, (state) => {
            state.status = "failed";
            state = initialState
        })
    }
})

export const { setAuthToken, setRefreshToken, resetAuth } = authSlice.actions;
export default authSlice.reducer