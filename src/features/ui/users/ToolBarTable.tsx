import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import { alpha } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"
import BlockIcon from "@mui/icons-material/Block"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import PersonIcon from "@mui/icons-material/Person"
import EngineeringIcon from "@mui/icons-material/Engineering"
export type ToolBarTableType = {
  numSelected: number
}
export const ToolBarTable: React.FC<ToolBarTableType> = ({ numSelected }) => {
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
        // </Typography>
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
    </Toolbar>
  )
}
