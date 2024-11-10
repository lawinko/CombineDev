import { ApiResponse } from "apisauce"
import { END_POINTS } from "./api/api.endpoints"
import { api, ApiLocationResponse } from "./api"

export class ApiResource {
    constructor() { }

    requestGetLocations = async () => {
        const response: ApiResponse<ApiLocationResponse[]> = await api.apisauce.get(
            END_POINTS.RESOURCE.GET_LOCATIONS,
        )
        return response
    }
}