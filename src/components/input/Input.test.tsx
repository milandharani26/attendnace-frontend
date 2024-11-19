import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Input from './Input'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    testField: Yup.string()
        .required('This field is required')
})

describe('Input Component', () => {
    test('renders with default props', () => {
        render(
            <Formik initialValues={{ testField: '' }} onSubmit={() => { }}>
                <Form>
                    <Input
                        label="Test Label"
                        name="testField"
                        placeholder="Enter text"
                        width="50%"
                        required={true}
                    />
                </Form>
            </Formik>
        )
        // Use a more flexible regex to check if the label and asterisk are present
        expect(screen.getByText(/Test Label/)).toBeInTheDocument()
        expect(screen.getByText('*')).toBeInTheDocument()

        // Check if the input field is rendered with the placeholder
        const input = screen.getByPlaceholderText('Enter text')
        expect(input).toBeInTheDocument()
    })

    test('displays asterisk when required is true', () => {
        render(
            <Formik initialValues={{ testField: '' }} onSubmit={() => { }}>
                <Form>
                    <Input
                        label="Required Input"
                        name="testField"
                        placeholder="Enter text"
                        width="50%"
                        required={true}
                    />
                </Form>
            </Formik>
        )
        // Check if the label text is present
        expect(screen.getByText('Required Input')).toBeInTheDocument()

        // Check if the asterisk is present
        expect(screen.getByText('*')).toBeInTheDocument()
    })


    test('displays error message when there is an error', async () => {
        render(
            <Formik
                initialValues={{ testField: '' }}
                onSubmit={() => { }}
                validationSchema={validationSchema}
                validateOnBlur={false} // Validate on submit
            >
                <Form>
                    <Input
                        label="Test Field"
                        name="testField"
                        placeholder="Enter text"
                        required={true}
                        width="50%"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        );

        // Simulate a form submission without filling in the field
        fireEvent.click(screen.getByText('Submit'));

        // Wait for the error message to appear
        const errorMessage = await waitFor(() =>
            screen.getByText('This field is required')
        );

        // Check if the error message is displayed
        expect(errorMessage).toBeInTheDocument();
    });



})
