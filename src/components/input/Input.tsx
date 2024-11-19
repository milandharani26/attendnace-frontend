import { ErrorMessage, Field } from 'formik'
import './input.scss'
import { Typography } from '@mui/material'

interface inputProps {
  label: string
  type?: string
  placeholder: string
  name: string,
  width: string,
  fieldClassName?: string,
  value?: string,
  disabled?: boolean,
  required?: boolean,
  errors?: string,
  maxLength?: number,
}


const Input: React.FC<inputProps> = ({
  label,
  type,
  placeholder,
  name,
  width,
  fieldClassName,
  value,
  disabled,
  required = false,
  //   errors,
  maxLength = 25,
  ...props
}) => {
  return (
    <div className='commonForm-input' style={{ width: width || '32%' }}>
      {label ? (
        <Typography>
          {label}
          <span>{required ? '*' : ''}</span>
        </Typography>
      ) : (
        ''
      )}
      <Field
        type={type || 'text'}
        placeholder={placeholder}
        name={name}
        className={fieldClassName}
        disabled={disabled}
        // style={{ borderColor: errors != undefined && errors != null && errors[name] ? 'red' : '' }}
        maxLength={maxLength}
        {...(value !== undefined ? { value } : {})}
        {...props}
      />
      <ErrorMessage name={name} component='div' className='error-msg' />
    </div>
  )
}

export default Input
