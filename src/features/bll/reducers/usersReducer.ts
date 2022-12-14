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
    deleteUser(state, action: PayloadAction<{ id: readonly string[] }>) {
      state.users.map((user, index) => {
        action.payload.id.map((id) => {
          if (user.id === id) {
            state.users.splice(index, 1)
          }
        })
      })
    },

    blockUserAC(state, action: PayloadAction<{ id: readonly string[]; isBlock: boolean }>) {
      action.payload.id.map((el) => {
        return state.users.map((user) => {
          if (user.id === el) {
            user.blockStatus = action.payload.isBlock
          }
        })
      })
    },
  },
})

export const usersReducer = slice.reducer
export const getUsers = slice.actions.getUsers
export const deleteUser = slice.actions.deleteUser
export const blockUser = slice.actions.blockUserAC

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

export const deleteUserTC = createAsyncThunk("users/deleteUsers", async (payload: { token: string | null; id: readonly string[] }, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    if (payload.token) {
      payload.id.map((el) => {
        el === payload.token && localStorage.removeItem("token")
      })
    }
    const response = await usersApi.deleteUser({ id: payload.id })
    if (response.data.resultCode === 0) {
      thunkApi.dispatch(deleteUser({ id: payload.id }))
    }
  } catch (e) {
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppStatusAC({ status: "idle" }))
  }
})

export const blockUserTC = createAsyncThunk("users/blockUser", async (payload: { token: string | null; id: readonly string[]; isBlock: boolean; unblock: boolean }, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    if (payload.token && payload.unblock === false) {
      payload.id.map((el) => {
        el === payload.token && localStorage.removeItem("token")
      })
    }
    const response = await usersApi.blockUser({ id: payload.id, isBlocked: payload.isBlock })
    if (response.data.resultCode === 0) {
      thunkApi.dispatch(blockUser({ id: payload.id, isBlock: payload.isBlock }))
    }
  } catch (e) {
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppStatusAC({ status: "idle" }))
  }
})
