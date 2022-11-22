import { RouterPath } from "../../../../common/components/routes/Routs"
import { CommonAuthForm } from "../common-form/CommonForm"

export const Registration = () => {
  return <CommonAuthForm onValidatorUserName={true} navLinkName="Back to Login" rout={RouterPath.login} submitBtnname="REGISTRATION" />
}
