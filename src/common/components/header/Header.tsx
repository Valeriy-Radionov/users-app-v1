import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ bgcolor: "rgb(181,154,255)", background: "linear-gradient(0deg, rgba(181,154,255,1) 17%, rgba(121,186,247,0.8) 61%)" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Valeriy Radionov
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
