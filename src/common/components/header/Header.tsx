import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import LogoutIcon from "@mui/icons-material/Logout"

export const Header = () => {
  const [auth, setAuth] = React.useState(true)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

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
          <IconButton aria-label="delete" size="large">
            <LogoutIcon fontSize="large" style={{ color: "#13D170" }} sx={{ boxShadow: 5, borderRadius: "5px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
