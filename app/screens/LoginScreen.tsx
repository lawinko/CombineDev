import { FC } from "react"
import { ViewStyle, View, Alert } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "@/navigators"
import { Button, Screen, Text } from "@/components"
import { Field, Formik } from "formik"
import { FormTextField } from "@/components/molecules/FormTextField"
import { LoginSchema } from "@/utils/ValidationUtils"
import Spacer from "@/components/atoms/Spacer"
import { CDLoader } from "@/components/atoms/CDLoader"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { login } from "@/features/auth/authSlice"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { GeneralApiProblem } from "@/services/api/apiProblem"
// import { useNavigation } from "@react-navigation/native"

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

interface LoginFieldsProps {
  username: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = () => {

  const initialValues: LoginFieldsProps = {
    username: "",
    password: "",
  }

  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)

  const onLogin = (values: LoginFieldsProps) => {
    dispatch(login({ username: values.username, password: values.password })).unwrap()
      .catch((rejectedValueOrSerializedError: GeneralApiProblem) => {
        Alert.alert("Error", rejectedValueOrSerializedError.kind)
      })
  }

  return (
    <Screen style={$root} preset="fixed">
      <CDLoader statuses={[status]} />
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          onLogin(values)
        }}
      >
        {(formikProps) => (
          <View>
            <Field
              component={FormTextField}
              name="username"
              labelTx="loginScreen:usernameLabel"
              placeholderTx="loginScreen:usernamePlaceholder"
              keyboardType="default"
              inputMode="text"
              autoCapitalize="none"
            />
            <Spacer vertical={12} />
            <Field
              component={FormTextField}
              name="password"
              labelTx="loginScreen:passwordLabel"
              placeholderTx="loginScreen:passwordPlaceholder"
              keyboardType="default"
              inputMode="text"
              secureTextEntry={true}
            />
            <Spacer vertical={24} />
            <Button testID="login" onPress={() => formikProps.handleSubmit()} tx="loginScreen:login" />
          </View>
        )}
      </Formik>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  padding: 16,
}