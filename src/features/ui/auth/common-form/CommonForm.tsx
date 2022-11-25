import { Button, FormControl, FormGroup, Grid, TextField } from "@mui/material"
import { useFormik } from "formik"
import React from "react"
import { Navigate } from "react-router-dom"
import { LoginDataType } from "../../../../api/authApi"
import { NavigateButton } from "../../../../common/components/nav-button/NavigateButton"
import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/storeHooks"
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
  submitBtnname: string
}

export const CommonAuthForm: React.FC<CommonAuthFormType> = ({ rout, navLinkName, submitBtnname }) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: FormikType = {}
      validatorEmail(values.email, errors)
      validatorRequiredValue(values, errors, false)
      return errors
    },
    onSubmit: (values) => {
      const value: LoginDataType = {
        email: values.email,
        password: values.password,
      }
      dispatch(loginTC(value))
      formik.resetForm()
    },
  })
  if (isLoggedIn) {
    return <Navigate key={"usersTable"} to={"/users"} />
  }
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "40vh" }}>
      <Grid item justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
          <FormControl
            sx={{
              width: "350px",
              bgcolor: "rgb(181,154,255)",
              background: "linear-gradient(0deg, rgba(181,154,255,1) 17%, rgba(121,186,247,0.8) 61%)",
              marginTop: "50px",
              borderRadius: "5px",
            }}
          >
            <FormGroup sx={{ margin: "20px" }}>
              <h2 style={{ color: "white" }}>Enter your email address and password</h2>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.email}</div>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.password}</div>}
              <Button
                type={"submit"}
                variant={"contained"}
                sx={{
                  bgcolor: "rgb(181,154,255)",
                  ":hover": {
                    bgcolor: "rgba(121,186,247,0.4)",
                  },
                }}
              >
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
