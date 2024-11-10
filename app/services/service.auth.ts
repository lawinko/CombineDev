import { ApiResponse } from "apisauce";
import { ApiLoginPayload, ApiRefreshTokenPayload } from "./api/api.payload";
import { api, ApiLoginResponse, ApiRefreshTokenResponse } from "./api";
import { END_POINTS } from "./api/api.endpoints";

export class ApiAuth {
    constructor() { }

    requestPostLogin = async (payload: ApiLoginPayload) => {
        const response: ApiResponse<ApiLoginResponse> = await api.apisauce.post(
            END_POINTS.AUTH.LOGIN,
            payload
        )
        return response
    }

    requestPostRefreshToken = async (payload: ApiRefreshTokenPayload) => {
        const response: ApiResponse<ApiRefreshTokenResponse> = await api.apisauce.post(
            END_POINTS.AUTH.REFRESH_TOKEN,
            payload
        )
        return response
    }
}