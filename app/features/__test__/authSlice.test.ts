import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initialState, login, refreshToken, setAuthToken, setRefreshToken, resetAuth, AuthState } from "../auth/authSlice";
import { ApiAuth } from "@/services/service.auth";
import { Api, api, ApiLoginResponse, ApiRefreshTokenResponse } from "@/services/api";
import reducer from "../auth/authSlice";
import { ApiResponse } from "apisauce";

jest.mock("@/services/service.auth");
jest.mock("@/services/api");

const mockedApiAuth = ApiAuth as jest.Mocked<typeof ApiAuth>;

describe("authSlice", () => {
    let store: ReturnType<typeof configureStore>;
    let authState: AuthState;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
            preloadedState: { auth: initialState },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        });
        authState = (store.getState() as { auth: AuthState }).auth;
    });

    it("should handle initial state", () => {
        expect(authState).toEqual(initialState);
    });

    it("should handle setAuthToken", () => {
        const previousState: AuthState = {
            authToken: null,
            refreshToken: null,
            status: "uninitialized"
        }
        expect(reducer(previousState, setAuthToken('testAuthToken'))).toEqual(
            {
                authToken: 'testAuthToken',
                refreshToken: null,
                status: "uninitialized"
            }
        )
    });

    it("should handle setRefreshToken", () => {
        const previousState: AuthState = {
            authToken: null,
            refreshToken: null,
            status: "uninitialized"
        }
        expect(reducer(previousState, setRefreshToken('testRefreshToken'))).toEqual(
            {
                authToken: null,
                refreshToken: 'testRefreshToken',
                status: "uninitialized"
            }
        )
    });

    it("should handle resetAuth", () => {
        const previousState: AuthState = {
            authToken: "testAuthToken",
            refreshToken: "testRefreshToken",
            status: "uninitialized"
        }
        expect(reducer(previousState, resetAuth())).toEqual(
            {
                authToken: null,
                refreshToken: null,
                status: "uninitialized"
            }
        )
    });

    it("should handle login", async () => {
        const response: ApiResponse<ApiLoginResponse> = {
            ok: true,
            data: {
                access_token: 'test_access_token',
                refresh_token: 'test_refresh_token',
            },
            problem: null,
            originalError: null,
        };
        mockedApiAuth.prototype.requestPostLogin = jest.fn().mockResolvedValueOnce(response);

        await store.dispatch(login({ username: 'testuser', password: 'password123' }) as any);

        authState = (store.getState() as { auth: AuthState }).auth;
        const state = authState;
        expect(state.status).toBe('succeeded');
        expect(state.authToken).toEqual('test_access_token');
        expect(state.refreshToken).toEqual('test_refresh_token');
    });

    it("should handle login failure", async () => {
        const response: ApiResponse<ApiLoginResponse> = {
            ok: false,
            problem: 'CLIENT_ERROR', // or any valid PROBLEM_CODE
            originalError: {} as any,
        };
        mockedApiAuth.prototype.requestPostLogin = jest.fn().mockResolvedValueOnce(response);

        await store.dispatch(login({ username: "test", password: "test" }) as any);

        authState = (store.getState() as { auth: AuthState }).auth;
        const state = authState;
        expect(state.authToken).toBeNull();
        expect(state.refreshToken).toBeNull();
        expect(state.status).toBe("failed");
    });

    it("should handle refreshToken", async () => {
        const response: ApiResponse<ApiRefreshTokenResponse> = {
            ok: true,
            data: {
                access_token: 'newAccessToken',
                refresh_token: 'newRefreshToken',
            },
            problem: null,
            originalError: null,
        };

        mockedApiAuth.prototype.requestPostRefreshToken = jest.fn().mockResolvedValueOnce(response);
        await store.dispatch(setRefreshToken('testRefreshToken') as any);
        await store.dispatch(refreshToken() as any);

        authState = (store.getState() as { auth: AuthState }).auth;
        expect(authState.status).toBe('succeeded');
        expect(authState.authToken).toEqual('newAccessToken');
        expect(authState.refreshToken).toEqual('newRefreshToken');
    });

    it("should handle refreshToken failure", async () => {
        const response: ApiResponse<ApiLoginResponse> = {
            ok: false,
            problem: 'CLIENT_ERROR', // or any valid PROBLEM_CODE
            originalError: {} as any,
        };

        mockedApiAuth.prototype.requestPostRefreshToken = jest.fn().mockResolvedValueOnce(response);

        await store.dispatch(refreshToken() as any);

        authState = (store.getState() as { auth: AuthState }).auth;
        expect(authState.authToken).toBeNull();
        expect(authState.refreshToken).toBeNull();
        expect(authState.status).toBe("failed");
    });
});
