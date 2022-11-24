import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/storeHooks"
import { createAction } from "../../../common/utils/users-action/usersPage"
import { getUsersTC } from "../../bll/reducers/usersReducer"
import { EnhancedTableHead } from "./table/EnhancedTableHead"
import { UsersTableBody } from "./table/TableBody"
import { ToolBarTable } from "./table/ToolBarTable"

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
  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const deleteUser = () => {
    createAction(users, selected, "delete", dispatch)
    dispatch(getUsersTC(token!))
    // setSelected([])
  }
  const blockUser = () => {
    createAction(users, selected, "block", dispatch)
    dispatch(getUsersTC(token!))
    setSelected([])
  }
  const unblockUser = () => {
    createAction(users, selected, "unblock", dispatch)
    dispatch(getUsersTC(token!))
    setSelected([])
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  useEffect(() => {
    dispatch(getUsersTC(token!))
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "90%", mb: 2, margin: "0 auto" }}>
        <ToolBarTable numSelected={selected.length} blockUser={blockUser} deleteUser={deleteUser} unblockUser={unblockUser} selected={selected} />

        <TableContainer sx={{ borderRadius: "5px" }}>
          <Table aria-labelledby="tableTitle" size={"medium"} sx={{ border: "2px solid black" }}>
            <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={users.length} />
            <TableBody>
              {users.map((user) => {
                const isItemSelected = isSelected(user.name)
                const labelId = user.id
                return <UsersTableBody key={user.id} isItemSelected={isItemSelected} selected={selected} setSelected={setSelected} user={user} labelId={labelId} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
