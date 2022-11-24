import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserDataType } from "../../../api/authApi"
import { usersApi } from "../../../api/usersApi"
import { handleServerNetworkError } from "../../../common/utils/axios-error/axiosErrorUtils"
import { setAppStatusAC } from "./appReducer"

export type UsersStateType = {
  users: UserDataType[]
}

const initialState: UsersStateType = {
  users: [{ id: "test", name: "test", email: "test", lastLoginDate: "test", isAuth: false, blockStatus: false, password: "test", registrationDate: "test" }],
}

const slice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUsers(state, action: PayloadAction<{ users: UserDataType[] }>) {
      state.users = action.payload.users
    },
    deleteUser(state, action: PayloadAction<{ id: string; isAll: boolean }>) {
      if (action.payload.isAll === true) {
        state.users = []
      } else {
        const index = state.users.findIndex((el) => el.id === action.payload.id)
        if (index !== -1) state.users.splice(index, 1)
      }
    },
    blockUser(state, action: PayloadAction<{ id: string; isBlock: boolean }>) {
      const index = state.users.findIndex((el) => el.id === action.payload.id)
      if (index !== -1) state.users[index].blockStatus = action.payload.isBlock
    },
  },
})

export const usersReducer = slice.reducer
export const getUsers = slice.actions.getUsers
export const deleteUser = slice.actions.deleteUser
export const blockUser = slice.actions.blockUser

export const getUsersTC = createAsyncThunk("users/getUsers", async (token: string, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    if (token) {
      const response = await usersApi.getUsers()
      if (response.data) {
        thunkApi.dispatch(getUsers({ users: response.data }))
        thunkApi.dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        thunkApi.dispatch(setAppStatusAC({ status: "failed" }))
      }
    }
  } catch (e) {
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppStatusAC({ status: "idle" }))
  }
})

export const deleteUserTC = createAsyncThunk("users/deleteUsers", async (payload: { token: string; id: string; isAll?: boolean }, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    if (payload.token === payload.id) {
      localStorage.removeItem("token")
    }
    if (payload.isAll === true) {
      await usersApi.deleteUser(payload.id, true)
    }
    await usersApi.deleteUser(payload.id, false)
  } catch (e) {
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppStatusAC({ status: "idle" }))
  }
})

export const blockUserTC = createAsyncThunk("users/blockUser", async (payload: { token: string; id: string; isBlock: boolean }, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    if (payload.token === payload.id) {
      localStorage.removeItem("token")
    }
    await usersApi.blockUser(payload.id, payload.isBlock)
  } catch (e) {
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppStatusAC({ status: "idle" }))
  }
})
