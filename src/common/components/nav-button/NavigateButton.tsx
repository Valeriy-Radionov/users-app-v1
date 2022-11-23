import Button from "@mui/material/Button"
import React, { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { RouterPath } from "../routes/Routs"

type NavigateButtonPropsType = {
  rout: RouterPath.login | RouterPath.registr
  name?: string
  callback?: () => void
  children?: ReactNode
}
export const NavigateButton: React.FC<NavigateButtonPropsType> = ({ rout, name, callback, children }) => {
  return (
    <NavLink to={rout} style={{ color: "#6a77d9", textAlign: "center", padding: "10px" }} onClick={callback}>
      {children}
      {name}
    </NavLink>
  )
}
