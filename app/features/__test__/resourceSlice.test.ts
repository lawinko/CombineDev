import { configureStore } from "@reduxjs/toolkit"
import resourceReducer, { getLocations, initialState, ResourceState } from "../resource/resourceSlice"
import { ApiResource } from "@/services/service.resource"
import { getGeneralApiProblem } from "@/services/api/apiProblem"
import { ApiResponse } from "apisauce";
import { ApiLocationResponse } from "@/services/api";

// Mock the ApiResource and getGeneralApiProblem
jest.mock("@/services/service.resource");
jest.mock("@/services/api");

const mockedApiAuth = ApiResource as jest.Mocked<typeof ApiResource>;

const mockGetGeneralApiProblem = getGeneralApiProblem as jest.MockedFunction<typeof getGeneralApiProblem>

describe("resourceSlice", () => {
    let store: ReturnType<typeof configureStore>;
    let resourceState: ResourceState;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: resourceReducer,
            },
            preloadedState: { auth: initialState },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        });
        resourceState = (store.getState() as { auth: ResourceState }).auth;
    });

    it("should handle initial state", () => {
        expect(resourceState).toEqual(initialState)
    })

    it("should handle getLocations", async () => {
        const response: ApiResponse<ApiLocationResponse[]> = {
            ok: true,
            data: [
                {
                    latitude: 37.9766618,
                    longitude: -122.8476458,
                    placeID: "",
                    formattedAddress: "1111 California St, San Francisco, CA 94108, United States"
                },
                {
                    latitude: 37.791507,
                    longitude: -122.413124,
                    placeID: "",
                    formattedAddress: "999 California St San Francisco, CA 94108"
                },
                {
                    latitude: 37.7906552,
                    longitude: -122.419436,
                    placeID: "ChIJid5uXpOAhYAR7qzkSXdhKh4",
                    formattedAddress: "1095 Hyde St, San Francisco, CA 94109, USA"
                }
            ],
            problem: null,
            originalError: null,
        };
        mockedApiAuth.prototype.requestGetLocations = jest.fn().mockResolvedValueOnce(response);

        await store.dispatch(getLocations() as any);

        resourceState = (store.getState() as { auth: ResourceState }).auth;
        expect(resourceState.locations.length).toBeGreaterThanOrEqual(3);
    })
})
