import { FormikType } from "../../../features/ui/auth/common-form/CommonForm"

const errorRequired = "Required field"

export const validatorEmail = (values: string, error: FormikType) => {
  if (!values) {
    error.email = errorRequired
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
    error.email = "Invalid email address"
  }
  return error
}

export const validatorRequiredValue = (values: FormikType, error: FormikType) => {
  !values.password && (error.password = errorRequired)
  !values.name && (error.name = "required field")
  return error
}
