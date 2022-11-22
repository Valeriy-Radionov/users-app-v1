import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import React from "react"
import { UserDataType } from "../../../api/authApi"
import { usersApi } from "../../../api/usersApi"
import { handleServerNetworkError } from "../../../common/utils/axios-error/axiosErrorUtils"
import { Users } from "../../ui/users/Users"
import { setAppStatusAC } from "./appReducer"
import { setIsLoggedInAC } from "./authReducer"

export type UsersStateType = {
  users: UserDataType[]
}

const initialState: UsersStateType = {
  users: [],
}

const slice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUsers(state, action: PayloadAction<{ users: UserDataType[] }>) {
      state.users = action.payload.users
    },
  },
})

export const usersReducer = slice.reducer
export const getUsers = slice.actions.getUsers

export const getUsersTC = createAsyncThunk("users/getUsers", async (token: string, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const response = await usersApi.getUsers()
    if (response.data) {
      thunkApi.dispatch(getUsers({ users: response.data }))
      thunkApi.dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      thunkApi.dispatch(setAppStatusAC({ status: "failed" }))
    }
  } catch (e) {
    thunkApi.dispatch(setAppStatusAC({ status: "failed" }))
    handleServerNetworkError(e, thunkApi.dispatch)
  }
})
