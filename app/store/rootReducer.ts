import authSlice from "@/features/auth/authSlice"
import resourceSlice from "@/features/resource/resourceSlice"
import { combineReducers } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({
    auth: authSlice,
    resource: resourceSlice
})
