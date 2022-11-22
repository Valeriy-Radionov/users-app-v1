import React, { useCallback } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks"
import { Navigate } from "react-router-dom"
import { logoutTC } from "../../../features/bll/reducers/authReducer"
import { Satellite } from "@mui/icons-material"

export const Header = () => {
  const dispatch = useAppDispatch()
  const [auth, setAuth] = React.useState(true)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ background: "#6a77d9" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Users App
          </Typography>
          {auth && (
            <Typography variant="h5" component="div" sx={{ flexGrow: 0, paddingRight: 2 }}>
              Name user
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
