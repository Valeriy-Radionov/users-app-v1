import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/storeHooks"
import { setRegistration } from "../../../bll/reducers/authReducer"
import { CommonAuthForm } from "../common-form/CommonForm"

export const Registration = () => {
  const dispatch = useAppDispatch()
  const isReg = useAppSelector((state) => state.auth.valueRegistration)
  const navigate = useNavigate()

  if (isReg) {
    dispatch(setRegistration({ value: false }))
    navigate("/login")
  }

  return <CommonAuthForm onValidatorUserName={true} navLinkName="Back to Login" rout={RouterPath.login} submitBtnname="REGISTRATION" />
}
