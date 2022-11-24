import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import { ToolBarTable } from "./table/ToolBarTable"
import { EnhancedTableHead } from "./table/EnhancedTableHead"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/storeHooks"
import { deleteUserTC, getUsersTC } from "../../bll/reducers/usersReducer"
import { UserDataType } from "../../../api/authApi"
import { UsersTableBody } from "./table/TableBody"
import { createAction } from "../../../common/utils/users-action/usersPage"

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
  const token = localStorage.getItem("token")
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const deleteUser = () => {
    createAction(users, selected, "delete", dispatch)
    dispatch(getUsersTC(token!))
  }
  const blockUser = () => {
    createAction(users, selected, "block", dispatch)
    dispatch(getUsersTC(token!))
  }
  const unblockUser = () => {
    createAction(users, selected, "unblock", dispatch)
    dispatch(getUsersTC(token!))
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    token && dispatch(getUsersTC(token!))
  }, [dispatch])

  const isSelected = (name: string) => selected.indexOf(name) !== -1
  if (!token) {
    return <Navigate to="/login" />
  }
  if (!token) {
    return <Navigate to={"login"} />
  }

  return (
    <Box sx={{ width: "100%" }}>
      <ToolBarTable numSelected={selected.length} blockUser={blockUser} deleteUser={deleteUser} unblockUser={unblockUser} />
      <Paper sx={{ width: "90%", mb: 2, margin: "0 auto" }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={users.length} />
            <TableBody>
              {users.map((user, index) => {
                const isItemSelected = isSelected(user.name)
                const labelId = user.id
                return <UsersTableBody key={user.id} isItemSelected={isItemSelected} selected={selected} setSelected={setSelected} user={user} labelId={labelId} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
