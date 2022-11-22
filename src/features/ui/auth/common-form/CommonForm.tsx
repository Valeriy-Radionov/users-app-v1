import { Button, FormControl, FormGroup, Grid, TextField } from "@mui/material"
import { useFormik } from "formik"
import React from "react"
import { LoginDataType } from "../../../../api/authApi"
import { NavigateButton } from "../../../../common/components/nav-button/NavigateButton"
import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppDispatch } from "../../../../common/hooks/storeHooks"
import { validatorEmail, validatorRequiredValue } from "../../../../common/utils/validators/authValidators"
import { loginTC } from "../../../bll/reducers/authReducer"
export type FormikType = {
  email?: string
  password?: string
  name?: string
}
type CommonAuthFormType = {
  rout: RouterPath.login | RouterPath.registr
  navLinkName: string
  onValidatorUserName?: boolean
  submitBtnname: string
}

export const CommonAuthForm: React.FC<CommonAuthFormType> = ({ onValidatorUserName, rout, navLinkName, submitBtnname }) => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: (values) => {
      const errors: FormikType = {}
      validatorEmail(values.email, errors)
      validatorRequiredValue(values, errors, onValidatorUserName)
      console.log(errors)
      return errors
    },
    onSubmit: (values) => {
      const value: LoginDataType = {
        email: values.email,
        password: values.password,
      }
      !onValidatorUserName && dispatch(loginTC(value))
      console.log("On submit")
      formik.resetForm()
    },
  })
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "40vh" }}>
      <Grid item justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
          <FormControl sx={{ width: "300px", bgcolor: "#c5d0d1", marginTop: "50px", borderRadius: "5px" }}>
            <FormGroup sx={{ margin: "20px" }}>
              {onValidatorUserName ? <h2 style={{ textAlign: "center" }}>Enter your registration data</h2> : <h2>Enter your email address and password</h2>}
              {onValidatorUserName && <TextField label="User name" margin="normal" {...formik.getFieldProps("name")} />}
              {formik.touched.name && formik.errors.name && onValidatorUserName && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.name}</div>}

              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.email}</div>}

              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.password}</div>}
              <Button type={"submit"} variant={"contained"} sx={{ bgcolor: "#6a77d9" }}>
                {submitBtnname}
              </Button>
            </FormGroup>
            <NavigateButton name={navLinkName} rout={rout} />
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
