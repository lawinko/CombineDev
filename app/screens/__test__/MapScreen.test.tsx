import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { MapScreen } from '../MapScreen'
import { getLocations, ResourceState } from '@/features/resource/resourceSlice'
import { AuthState, refreshToken, resetAuth } from '@/features/auth/authSlice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainNavigatorParamList } from '@/navigators'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from "@/features/auth/authSlice"
import resourceSlice from "@/features/resource/resourceSlice"

describe('MapScreen', () => {
    const resourceInitialState: ResourceState = {
        locations: [],
        status: "uninitialized"
    }
    const authInitialState: AuthState = {
        authToken: null,
        refreshToken: null,
        status: "uninitialized"
    }

    const store = configureStore({
        reducer: combineReducers({
            auth: authSlice,
            resource: resourceSlice
        }),
        preloadedState: {
            auth: authInitialState,
            resource: resourceInitialState
        },
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    const renderComponent = (props = {}) => {
        const navigation: NativeStackNavigationProp<MainNavigatorParamList, "Map", undefined> = {
        } as any
        return render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Provider store={store}>
                        <MapScreen navigation={navigation} route={{ key: "Map", name: "Map" }} />
                    </Provider>
                </NavigationContainer>
            </SafeAreaProvider>
        )
    }

    it('should render correctly', () => {
        const { getByText } = renderComponent()

        expect(getByText('mapScreen:reloadLocations')).toBeTruthy()
        expect(getByText('mapScreen:logout')).toBeTruthy()
    })

    it('should dispatch resetAuth on logout button press', () => {
        const { getByText } = renderComponent()

        fireEvent.press(getByText('mapScreen:logout'))

        expect(dispatchSpy).toHaveBeenCalledWith(resetAuth())
    })
})
