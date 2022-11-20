import { Label, LoginRounded } from "@mui/icons-material"
import { Grid, FormControl, FormLabel, FormGroup, TextField, FormControlLabel, Checkbox, Button, Paper } from "@mui/material"
import { useFormik } from "formik"
import React, { ReactNode } from "react"
import { validatorEmail, validatorRequiredValue } from "../../../../common/utils/validators/authValidators"
export type FormikType = {
  email?: string
  password?: string
  name?: string
}
type CommonAuthFormType = {
  onValidatorUserName?: boolean
}

export const CommonAuthForm: React.FC<CommonAuthFormType> = ({ onValidatorUserName }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: (values) => {
      const errors: FormikType = {}
      errors.email = validatorEmail(values.email, errors).email
      errors.password = validatorRequiredValue(values, errors).password
      onValidatorUserName && (errors.name = validatorRequiredValue(values, errors).name)
      return errors
    },
    onSubmit: (values) => {
      formik.resetForm()
    },
  })
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "40vh" }}>
      <Grid item justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: "300px" }}>
            <FormGroup sx={{ margin: "20px" }}>
              {onValidatorUserName ? <h2 style={{ textAlign: "center" }}>Enter your registration data</h2> : <h2>Enter your email address and password</h2>}
              {onValidatorUserName && <TextField label="User name" margin="normal" {...formik.getFieldProps("name")} />}
              {formik.touched.name && formik.errors.name && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.name}</div>}
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.email}</div>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.password}</div>}
              <Button type={"submit"} variant={"contained"} sx={{ bgcolor: "#6a77d9" }}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
