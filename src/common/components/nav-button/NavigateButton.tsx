import Button from "@mui/material/Button"
import React from "react"
import { NavLink } from "react-router-dom"
import { RouterPath } from "../routes/Routs"

type NavigateButtonPropsType = {
  rout: RouterPath.login | RouterPath.registr
  name: string
}
export const NavigateButton: React.FC<NavigateButtonPropsType> = ({ rout, name }) => {
  return (
    <NavLink to={rout} style={{ color: "#6a77d9", textAlign: "center", padding: "10px" }}>
      {name}
    </NavLink>
  )
}
