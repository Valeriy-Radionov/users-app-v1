import { useEffect } from "react"
import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppDispatch } from "../../../../common/hooks/storeHooks"
import { deleteRegData } from "../../../bll/reducers/authReducer"
import { CommonAuthForm } from "../common-form/CommonForm"

export const Login = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(deleteRegData({ value: false }))
  }, [])
  return <CommonAuthForm navLinkName="Registration" rout={RouterPath.registr} submitBtnname="LOGIN" />
}
