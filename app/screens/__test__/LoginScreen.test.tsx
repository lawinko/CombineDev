import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react-native"
import { LoginScreen } from "../LoginScreen"
import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from "react-redux"
import { store } from "@/store/store"

jest.mock('reactotron-core-client', () => {
    return {
        ArgType: jest.fn(),
    }
})

const renderComponent = (props = {}) => {
    const navigation: NativeStackNavigationProp<AppStackParamList, "Login", undefined> = {
    } as any
    return render(
        <SafeAreaProvider>
            <NavigationContainer>
                <Provider store={store}>
                    <LoginScreen navigation={navigation} route={{ key: "Login", name: "Login" }} />
                </Provider>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

describe("LoginScreen", () => {
    it("renders correctly", () => {
        const { getByPlaceholderText, getByText, debug } = renderComponent()

        // debug()
        expect(getByPlaceholderText("loginScreen:usernamePlaceholder")).toBeTruthy()
        expect(getByPlaceholderText("loginScreen:passwordPlaceholder")).toBeTruthy()
        expect(getByText("loginScreen:login")).toBeTruthy()
    })

    it("submits the form with correct values", async () => {
        const { getByPlaceholderText, queryByText, getByTestId, debug } = renderComponent()
        fireEvent.changeText(getByPlaceholderText("loginScreen:usernamePlaceholder"), "testuser")
        fireEvent.changeText(getByPlaceholderText("loginScreen:passwordPlaceholder"), "password123")

        act(() => {
            fireEvent.press(getByTestId("login"))
        })
        await waitFor(() => {
            expect(queryByText("Username is required")).toBeNull();
            expect(queryByText("Password is required")).toBeNull();
        });
    })

    it("show error message when username and password is empty", async () => {
        const { getByTestId, getByText, debug } = renderComponent()

        act(() => {
            fireEvent.press(getByTestId("login"))
        })
        await waitFor(() => {
            expect(getByText("Username is required")).toBeTruthy();
            expect(getByText("Password is required")).toBeTruthy();
        });
    })
})
