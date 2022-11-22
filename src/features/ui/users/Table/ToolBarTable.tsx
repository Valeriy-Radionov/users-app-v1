import BlockIcon from "@mui/icons-material/Block"
import DeleteIcon from "@mui/icons-material/Delete"
import EngineeringIcon from "@mui/icons-material/Engineering"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import PersonIcon from "@mui/icons-material/Person"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useAppDispatch } from "../../../../common/hooks/storeHooks"
import { logoutTC } from "../../../bll/reducers/authReducer"
import { Navigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { useEffect } from "react"
import { render } from "react-dom"
import { Login } from "../../auth/login/Login"
import { NavLink } from "react-router-dom"

export type ToolBarTableType = {
  numSelected: number
}
export const ToolBarTable: React.FC<ToolBarTableType> = ({ numSelected }) => {
  const dispatch = useAppDispatch()
  let token = localStorage.getItem("token")
  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 2, sm: 2 },
        border: "2px solid",
        borderRadius: "5px",
        borderColor: "#6a77d9",
        margin: "10px 0px 10px 0px",
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          <div style={{ display: "flex" }}>
            <div>Selected {numSelected}</div>
            <div>
              <PersonIcon></PersonIcon>
            </div>
          </div>
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1" id="tableTitle" component="div">
          <div style={{ display: "flex" }}>
            <div>Selected {numSelected}</div>
            <div>
              <PersonIcon></PersonIcon>
            </div>
          </div>
        </Typography>
      )}
      {numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton>
            <BlockIcon color="secondary" />
          </IconButton>
          <IconButton>
            <LockOpenIcon color="success" />
          </IconButton>
        </div>
      ) : (
        <div>
          <span>No actions</span>
          <EngineeringIcon></EngineeringIcon>
        </div>
      )}
      <IconButton aria-label="delete" size="large" onClick={logoutHandler}>
        <LogoutIcon fontSize="large" style={{ color: "#13D170" }} sx={{ boxShadow: 5, borderRadius: "5px" }} />
      </IconButton>
    </Toolbar>
  )
}
