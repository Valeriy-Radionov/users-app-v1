import { Route, Routes } from "react-router-dom"
import { Login } from "../../../features/ui/auth/login/Login"
import { Registration } from "../../../features/ui/auth/registration/Registration"
import { Users } from "../../../features/ui/users/Users"
import { ErrorPage } from "../error/ErrorPage"
export enum RouterPath {
  login = "/login",
  registr = "/registration",
  users = "/users",
  error = "*",
}
export const Routs = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={RouterPath.login} element={<Login />} />
      <Route path={RouterPath.registr} element={<Registration />} />
      <Route path={RouterPath.users} element={<Users />} />
      <Route path={RouterPath.error} element={<ErrorPage />} />
    </Routes>
  )
}
