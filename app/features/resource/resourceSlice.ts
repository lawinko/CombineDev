import { CDLocation } from "@/models/CDLocation"
import { getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResource } from "@/services/service.resource"
import { LoadingStatus } from "@/utils/customTypes"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface ResourceState {
    locations: CDLocation[],
    status: LoadingStatus
}

export const initialState: ResourceState = {
    locations: [],
    status: "uninitialized"
}

export const getLocations = createAsyncThunk(
    "resource/getLocations",
    async (_, { rejectWithValue }) => {
        const response = await new ApiResource().requestGetLocations()

        if (response.ok) {
            return response.data
        } else {
            return rejectWithValue(getGeneralApiProblem(response))
        }
    },
)

// latitude: 37.9766618
// longitude: -122.8476458
// placeID: ""
// formattedAddress: 1111 California St, San Francisco, CA 94108, United States
// latitude: 37.791507
// longitude: -122.413124
// placeID: ""
// formattedAddress: 999 California St San Francisco, CA 94108
// latitude: 37.7906552
// longitude: -122.419436
// placeID: ChIJid5uXpOAhYAR7qzkSXdhKh4
// formattedAddress: 1095 Hyde St, San Francisco, CA 94109, USA

const resourceSlice = createSlice({
    name: "resource",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getLocations.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getLocations.fulfilled, (state, action) => {
            state.status = "succeeded"
            if (action.payload) {
                state.locations = action.payload.filter((value) => {
                    return value.latitude !== 0 && value.longitude !== 0
                })
            }
        })
        builder.addCase(getLocations.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default resourceSlice.reducer