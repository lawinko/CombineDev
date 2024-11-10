import { TxKeyPath } from "app/i18n"
import { ErrorMessage } from "formik"
import * as React from "react"
import { StyleProp, TextInput, TextStyle, ViewStyle } from "react-native"
import { Text, TextProps } from "../Text"
import { TextField, TextFieldProps } from "../TextField"
import { colors, typography } from "@/theme"

export interface FormTextFieldProps extends Omit<TextFieldProps, "ref"> {
  field?: any
  form?: any
  style?: StyleProp<TextStyle>
}

/**
 * Describe your component here
 */
export const FormTextField = React.memo(React.forwardRef(function FormTextField(
  props: FormTextFieldProps,
  ref: React.Ref<TextInput>,
) {
  const {
    field: { name, onBlur, onChange },
    form: { errors, touched, setFieldTouched },
    ...TextFieldProps
  } = props

  const inputRef = React.useRef<TextInput>(null)

  return (
    <>
      <TextField
        testID="text-input"
        ref={inputRef}
        defaultValue={TextFieldProps.defaultValue}
        onChangeText={(text) => {
          onChange(name)(text)
        }}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...TextFieldProps}
      />
      <ErrorMessage name={name}
        render={(errorMessage) =>
          <Text
            preset="formHelper"
            text={errorMessage}
            {...TextFieldProps.HelperTextProps}
            {...$helperStyle}
          />
        } />
    </>
  )
}))

const $helperStyle: TextProps = {
  style: {
    color: colors.error,
  },
  size: "xs",
}
