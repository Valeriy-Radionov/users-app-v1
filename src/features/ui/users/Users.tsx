import React from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import { ToolBarTable } from "./Table/ToolBarTable"
import { EnhancedTableHead } from "./Table/EnhancedTableHead"

export type Data = {
  userId: string
  name: string
  email: string
  firstDate: string
  lastDate: string
  status: boolean
}
export type HeadCell = {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}
export type Order = "asc" | "desc"

export const Users = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  function createData(userId: string, name: string, email: string, firstDate: string, lastDate: string, status: boolean): Data {
    return {
      userId,
      name,
      email,
      firstDate,
      lastDate,
      status,
    }
  }
  const rows = [
    createData("1111113245657678", "Valerka", "tra-berker@mail.ru", "12.08.12/07:45", "15.09.22/04:34", false),
    createData("1111113245657632278", "Dima", "yandex@ef.ru", "02.08.22/07:45", "14.09.22/04:34", true),
    createData("3", "305", "3.7", "67", "4.3", false),
    createData("4", "305", "3.7", "67", "4.2323", false),
    createData("5", "30r5", "3d.7", "67", "4.323", false),
    createData("6", "45r2", "25.0", "51", " 4.r39", false),
    createData("7", "4r5rr2", "25.0", "51", " 4.r9", false),
    createData("8", "452", "2rr5.0", "rrr51", " 4.9", false),
    createData("9", "305", "3.7s", "6s7", "4.3", false),
    createData("10", "30s5", "3.557", "67", "4s.3", false),
    createData("11", "305", "3.7ee", "6s7", "4.3", false),
    createData("12", "452", "25.0", "51", " 4.9", false),
    createData("13", "4452", "25.330", "51", " 4.9", false),
    createData("14", "4452", "25.330", "51", " 4.9", false),
    createData("15", "4452", "25.330", "51", " 4.9", false),
  ]

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "90%", mb: 2, margin: "0 auto" }}>
        <ToolBarTable numSelected={selected.length} />
        <TableContainer sx={{ border: "2px solid #9aa2e5" }}>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={rows.length} />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow hover onClick={(event) => handleClick(event, row.name)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.firstDate}</TableCell>
                    <TableCell align="right">{row.lastDate}</TableCell>
                    <TableCell align="right">{row.userId}</TableCell>
                    <TableCell align="right">{row.status.toString()}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
