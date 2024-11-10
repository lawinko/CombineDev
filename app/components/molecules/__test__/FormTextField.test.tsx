import React from "react"
import { render, fireEvent, act } from "@testing-library/react-native"
import { Formik } from "formik"
import { FormTextField } from "../../molecules/FormTextField"

describe("FormTextField", () => {
    const initialValues = { testField: "" }

    const renderComponent = (props = {}) => {
        return render(
            <Formik initialValues={initialValues} onSubmit={jest.fn()}>
                {({ handleChange, handleBlur, values }) => (
                    <FormTextField
                        field={{ name: "testField", onBlur: handleBlur, onChange: handleChange }}
                        form={{ errors: {}, touched: {}, setFieldTouched: jest.fn() }}
                        {...props}
                    />
                )}
            </Formik>
        )
    }

    it("renders correctly", () => {
        const { getByTestId } = renderComponent()
        expect(getByTestId("text-input")).toBeTruthy()
    })

    // it("displays error message when there is an error", () => {
    //     const { getByText, debug } = renderComponent({
    //         form: { errors: { testField: "Error message" }, touched: { testField: true } },
    //     })
    //     debug()
    //     expect(getByText("Error message")).toBeTruthy()
    // })
})
