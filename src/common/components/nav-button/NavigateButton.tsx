import React, { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { RouterPath } from "../routes/Routs"

type NavigateButtonPropsType = {
  rout: RouterPath.login | RouterPath.registr
  name?: string
  callback?: () => void
  children?: ReactNode
  type?: string | undefined
}
export const NavigateButton: React.FC<NavigateButtonPropsType> = ({ rout, name, callback, type, children }) => {
  return (
    <NavLink type={type} to={rout} style={{ color: "white", textAlign: "center", padding: "10px" }} onClick={callback}>
      {children}
      {name}
    </NavLink>
  )
}
