import { Route, Routes } from "react-router-dom"
import { Login } from "../../../features/ui/auth/login/Login"
import { Registration } from "../../../features/ui/auth/registration/Registration"
import { Users } from "../../../features/ui/users/Users"
import { ErrorPage } from "../error/ErrorPage"
export enum PATH {
  LOGIN = "/login",
  REGISTR = "/registration",
  USERS = "/users",
  ERROR = "*",
}
export const Routs = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTR} element={<Registration />} />
      <Route path={PATH.USERS} element={<Users />} />
      <Route path={PATH.ERROR} element={<ErrorPage />} />
    </Routes>
  )
}
