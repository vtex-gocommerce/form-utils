import { useField, useFormikContext } from 'formik'

interface Props {
  name: string
  label?: string
  placeholder?: string
  className?: string
  required?: boolean
  children: any
  formType: string
}

const Wrapper = ({ formType, children, ...inputProps }: Props) => {
  const [field, meta] = useField(inputProps)
  const { setFieldValue } = useFormikContext()

  const onClick = (e: React.ChangeEvent<any>, checked: boolean) => {
    setFieldValue(inputProps.name, e.target.value || checked)
  }

  const onChange = (value: string) => {
    setFieldValue(inputProps.name, value)
  }

  return children({
    ...field,
    ...inputProps,
    error: !!meta.touched && !!meta.error, // vtex error
    hasError: !!meta.touched && !!meta.error, // gc error
    values: field.value,
    checked: field.checked,
    onClick,
    ...(formType === 'DateTimePicker' ? { onChange } : {}),
  })
}

export default Wrapper