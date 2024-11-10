// Mock react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => ({
    KeyboardController: {
        setInputMode: jest.fn(),
    },
}))