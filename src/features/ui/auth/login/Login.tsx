import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppSelector } from "../../../../common/hooks/storeHooks"
import { CommonAuthForm } from "../common-form/CommonForm"

export const Login = () => {
  return <CommonAuthForm navLinkName="Registration" rout={RouterPath.registr} submitBtnname="LOGIN" onValidatorUserName={false} />
}
