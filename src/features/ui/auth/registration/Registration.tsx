import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useFormik } from "formik"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { RegistrationDataType } from "../../../../api/authApi"
import { NavigateButton } from "../../../../common/components/nav-button/NavigateButton"
import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/storeHooks"
import { validatorEmail, validatorRequiredValue } from "../../../../common/utils/validators/authValidators"
import { registrationTC, setRegistration } from "../../../bll/reducers/authReducer"
import { FormikType } from "../common-form/CommonForm"

export const Registration = () => {
  const dispatch = useAppDispatch()
  const isRegistr = useAppSelector((state) => state.auth.valueRegistration)
  const navigate = useNavigate()

  useEffect(() => {
    if (isRegistr) {
      dispatch(setRegistration({ value: false }))
      navigate(RouterPath.login)
    }
  }, [isRegistr])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: (values) => {
      const errors: FormikType = {}
      validatorEmail(values.email, errors)
      validatorRequiredValue(values, errors, true)
      return errors
    },
    onSubmit: (values) => {
      const regData: RegistrationDataType = {
        email: values.email,
        password: values.password,
        name: values.name,
      }
      dispatch(registrationTC(regData))
      formik.resetForm()
    },
  })
  if (isRegistr) {
    return <Navigate key={"usersTable"} to={RouterPath.login} />
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
              <h2 style={{ textAlign: "center", color: "white" }}>Enter your registration data</h2>
              <TextField label="User name" margin="normal" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && <div style={{ color: "red", padding: "0px 0px 10px 5px" }}>{formik.errors.name}</div>}

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
                {"REGISTRATION"}
              </Button>
            </FormGroup>
            <NavigateButton name={"Login"} rout={RouterPath.login} />
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
