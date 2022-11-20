import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material"
import { HeadCell } from "../Users"

export type EnhancedTableProps = {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}
export const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "firstDate",
      numeric: true,
      disablePadding: false,
      label: "Date of registration",
    },
    {
      id: "lastDate",
      numeric: true,
      disablePadding: false,
      label: "Last login date",
    },
    {
      id: "userId",
      numeric: true,
      disablePadding: false,
      label: "Id",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ]

  return (
    <TableHead sx={{ bgcolor: "#9aa2e5" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="error"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? "right" : "left"} padding={headCell.disablePadding ? "none" : "normal"} sx={{ color: "#666699" }}>
            <span>{headCell.label}</span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
