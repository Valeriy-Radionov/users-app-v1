import BlockIcon from "@mui/icons-material/Block"
import DeleteIcon from "@mui/icons-material/Delete"
import EngineeringIcon from "@mui/icons-material/Engineering"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { NavigateButton } from "../../../../common/components/nav-button/NavigateButton"
import { RouterPath } from "../../../../common/components/routes/Routs"
import { useAppDispatch } from "../../../../common/hooks/storeHooks"
import { logoutTC } from "../../../bll/reducers/authReducer"

export type ToolBarTableType = {
  numSelected: number
  deleteUser: () => void
  blockUser: () => void
  unblockUser: () => void
  selected: readonly string[]
}
export const ToolBarTable: React.FC<ToolBarTableType> = ({ numSelected, blockUser, deleteUser, unblockUser, selected }) => {
  const dispatch = useAppDispatch()
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
        bgcolor: "rgb(181,154,255)",
        background: "linear-gradient(0deg, rgba(181,154,255,1) 17%, rgba(121,186,247,0.8) 61%)",
        margin: "10px auto",
      }}
    >
      <Typography sx={{ flex: "1 1 100%", color: "white", fontSize: "18px" }} color="inherit" variant="subtitle1" component="div">
        <div style={{ display: "flex" }}>
          <div>Selected {numSelected}</div>
          <div>
            <PersonIcon></PersonIcon>
          </div>
        </div>
      </Typography>
      {numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          <IconButton onClick={deleteUser}>
            <DeleteIcon fontSize="large" color="error" />
          </IconButton>
          <IconButton onClick={blockUser}>
            <BlockIcon fontSize="large" color="secondary" />
          </IconButton>
          <IconButton onClick={unblockUser}>
            <LockOpenIcon fontSize="large" color="success" />
          </IconButton>
        </div>
      ) : (
        <div style={{ color: "white", fontSize: "18px" }}>
          <span>No actions</span>
          <EngineeringIcon></EngineeringIcon>
        </div>
      )}
      <NavigateButton rout={RouterPath.login} callback={logoutHandler}>
        <LogoutIcon fontSize="large" style={{ color: "white" }} sx={{ boxShadow: 5, borderRadius: "5px", border: "whitesmoke", ":hover": { bgcolor: "rgb(181,154,255)" } }} />
      </NavigateButton>
    </Toolbar>
  )
}
