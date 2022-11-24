import { ThunkDispatch } from "@reduxjs/toolkit"
import { UserDataType } from "../../../api/authApi"
import { blockUserTC, deleteUserTC } from "../../../features/bll/reducers/usersReducer"
import { useAppDispatch } from "../../hooks/storeHooks"

type dispatchType = ReturnType<typeof useAppDispatch>
const deleteUser = (users: UserDataType[], selected: readonly string[], selectedUser: UserDataType | undefined, currentToken: string | null, id: string | undefined, dispatch: dispatchType) => {
  if (selected.length === users.length) {
    dispatch(deleteUserTC({ token: currentToken!, id: currentToken!, isAll: true }))
  } else {
    if (selectedUser && currentToken === id) {
      dispatch(deleteUserTC({ token: currentToken, id: id, isAll: false }))
      localStorage.removeItem("token")
    }
    id && dispatch(deleteUserTC({ token: currentToken!, id: id, isAll: false }))
  }
}
const blockUser = (
  users: UserDataType[],
  selected: readonly string[],
  currentToken: string | null,
  selectedUser: UserDataType | undefined,
  id: string | undefined,
  dispatch: dispatchType,
  isBlock: boolean
) => {
  if (selected.length === users.length) {
    dispatch(blockUserTC({ token: currentToken!, id: currentToken!, isBlock: isBlock }))
  } else {
    if (selectedUser && currentToken === id) {
      dispatch(blockUserTC({ token: currentToken, id: id, isBlock: isBlock }))
      localStorage.removeItem("token")
    }
    id && dispatch(blockUserTC({ token: currentToken!, id: id, isBlock: isBlock }))
  }
}
export const createAction = (users: UserDataType[], selected: readonly string[], action: "delete" | "block" | "unblock", dispatch: dispatchType) => {
  const selectedUser = users.find((el) => selected[0] === el.name)
  const id = selectedUser?.id
  const currentToken = localStorage.getItem("token")

  if (action === "delete") {
    deleteUser(users, selected, selectedUser, currentToken, id, dispatch)
  } else if (action === "block") {
    blockUser(users, selected, currentToken, selectedUser, id, dispatch, true)
  } else {
    blockUser(users, selected, currentToken, selectedUser, id, dispatch, false)
  }
}
