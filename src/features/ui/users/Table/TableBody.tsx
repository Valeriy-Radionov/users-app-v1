import Checkbox from "@mui/material/Checkbox"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { UserDataType } from "../../../../api/authApi"

type TableBodyPropsType = {
  user: UserDataType
  selected: readonly string[]
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>
  isItemSelected: boolean
  labelId: string
}
export const UsersTableBody: React.FC<TableBodyPropsType> = ({ user, selected, setSelected, isItemSelected, labelId }) => {
  const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  return (
    <TableRow hover onClick={(event) => handleClick(event, user.id)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={user.id} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell id={labelId} scope="row" padding="none" key={user.id}>
        {user.name}
      </TableCell>
      <TableCell align="right">{user.email} </TableCell>
      <TableCell align="right">{user.registrationDate}</TableCell>
      <TableCell align="right">{user.lastLoginDate}</TableCell>
      <TableCell align="right">{user.id}</TableCell>
      <TableCell align="right">{user.blockStatus.toString()}</TableCell>
    </TableRow>
  )
}
