import * as React from 'react'
import { Formik, FormikProps, FormikBag, FormikHelpers, validateYupSchema } from 'formik'

import { Input as InputCurrency, InputTag } from 'gocommerce.styleguide'
import {
  Button,
  Checkbox as CheckBox,
  DatePicker,
  Dropdown as Select,
  Input,
  Radio as RadioButton,
  Textarea,
  Toggle,
} from 'vtex.styleguide'

import Wrapper from './FieldWrapper'

interface Props {
  id: string
  validationSchema: any
  initialValues: { [field: string]: any }
  onSubmit: ((values: {}, formikHelpers: FormikHelpers<{}>) => void | Promise<any>) & ((values: { [field: string]: any; }, formikBag?: FormikBag<{}, {}> | undefined) => void)
  children: any
}

class Form extends React.PureComponent<Props> {
  componentDidMount() {
    if (!validateYupSchema({}, this.props.validationSchema)) {
      console.warn('Invalid validation schema. Please check the docs at https://github.com/jquense/yup')
    }
  }

  static Input = props => (
    <Wrapper formType="Input" {...props}>
      {wrappedProps => <Input {...wrappedProps} />}
    </Wrapper>
  )

  static InputCurrency = props => (
    <Wrapper formType="InputCurrency" {...props}>
      {wrappedProps => <InputCurrency {...wrappedProps} formatValue="currency" />}
    </Wrapper>
  )

  static Toggle = props => (
    <Wrapper formType="Toggle" type="checkbox" {...props}>
      {wrapperProps => <Toggle {...wrapperProps} />}
    </Wrapper>
  )

  static InputTag = props => (
    <Wrapper formType="InputTag" {...props} multiple>
      {WrapperProps => <InputTag {...WrapperProps} />}
    </Wrapper>
  )

  static Textarea = props => (
    <Wrapper formType="Textarea" {...props}>
      {wrapperProps => <Textarea {...wrapperProps} />}
    </Wrapper>
  )

  static RadioButton = props => (
    <Wrapper formType="RadioButton" {...props} type="radio">
      {wrappedProps => <RadioButton {...wrappedProps} />}
    </Wrapper>
  )

  static Select = props => (
    <Wrapper formType="Select" {...props}>
      {wrapperProps => <Select {...wrapperProps} />}
    </Wrapper>
  )

  static Checkbox = props => (
    <Wrapper formType="CheckBox" {...props} type="checkbox">
      {wrappedProps => <CheckBox {...wrappedProps} />}
    </Wrapper>
  )

  static DatePicker = props => (
    <Wrapper formType="DateTimePicker" {...props}>
      {wrappedProps => <DatePicker {...wrappedProps} />}
    </Wrapper>
  )

  static SubmitButton: any = class SubmitBtn extends React.PureComponent<{ formId: string }, { isFormReady: boolean }> {
    state = { isFormReady: false }
    componentDidMount() {
      this.setState({ isFormReady: true })
    }
    render() {
      const { formId } = this.props
      const { isFormReady } = this.state
      return (
        <Button
          {...this.props}
          disabled={!isFormReady || this.props['disabled']}
          type="submit"
          onClick={() => {
            if (!formId) return null
            return document
              .getElementById(formId)!
              .dispatchEvent(new Event('submit', { cancelable: true }))
          }}
        />
      )
    }
  }

  render() {
    const { initialValues, onSubmit, children, validationSchema, id } = this.props

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formikProps: FormikProps<{ [key: string]: any }>) => (
          <form onSubmit={formikProps.handleSubmit} id={id}>
            {typeof children === 'function' ? children(formikProps) : React.cloneElement(children, formikProps)}
          </form>
        )}
      </Formik>
    )
  }
}

export default Form