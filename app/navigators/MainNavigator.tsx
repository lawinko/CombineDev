import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "@/screens"
import { useAppTheme } from "@/utils/useAppTheme"

export type MainNavigatorParamList = {
  Map: undefined
}

export type MainStackScreenProps<T extends keyof MainNavigatorParamList> = NativeStackScreenProps<
  MainNavigatorParamList,
  T
>

const Stack = createNativeStackNavigator<MainNavigatorParamList>()

export const MainNavigator = () => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      title: "",
      headerShadowVisible: false,
      headerBackVisible: false
    }}>
      <Stack.Screen name="Map" component={Screens.MapScreen} />

    </Stack.Navigator>
  )
}
